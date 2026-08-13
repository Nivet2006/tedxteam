/**
 * Production Reset Script
 * Clears all fake seed data (Members + ScanEvents) from the database.
 * AdminUser record is preserved (or re-created from ENV).
 *
 * Usage: npx tsx scripts/reset-prod.ts
 */

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import bcrypt from 'bcrypt';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error('❌  DATABASE_URL is not set in .env');
  process.exit(1);
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🗑️  Starting production data reset...\n');

  // 1. Delete all scan events first (FK constraint)
  const { count: scansDeleted } = await prisma.scanEvent.deleteMany({});
  console.log(`✅  Deleted ${scansDeleted} scan events`);

  // 2. Delete all members
  const { count: membersDeleted } = await prisma.member.deleteMany({});
  console.log(`✅  Deleted ${membersDeleted} members`);

  // 3. Ensure admin account exists with ENV credentials
  const adminEmail = (process.env.ADMIN_EMAIL || 'admin@tedxgcem.com').toLowerCase().trim();
  const adminPassword = process.env.ADMIN_PASSWORD || 'TEDxGCEM2026!SecureAdminPass';
  const passwordHash = await bcrypt.hash(adminPassword, 12);

  await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: { passwordHash },
    create: { email: adminEmail, passwordHash },
  });

  console.log(`\n✅  Admin account ready: ${adminEmail}`);
  console.log('\n🚀  Database is clean and production-ready!');
  console.log('    You can now add real members via the Admin Portal → /admin/members/new\n');
}

main()
  .catch((err) => {
    console.error('❌  Reset failed:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
