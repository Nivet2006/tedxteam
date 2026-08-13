import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function verify() {
  console.log('--- DATABASE VERIFICATION REPORT ---');
  const count = await prisma.member.count();
  console.log(`Total DB Member Count: ${count}`);

  const members = await prisma.member.findMany({
    orderBy: { slug: 'asc' },
    select: { name: true, slug: true, team: true, role: true, photoUrl: true },
  });

  console.log('\nMember Roster Audit:');
  let invalidPhotoCount = 0;

  members.forEach((m, idx) => {
    const isLocal = m.photoUrl.startsWith('/') && !m.photoUrl.startsWith('//');
    if (!isLocal || m.photoUrl.includes('unsplash')) {
      invalidPhotoCount++;
    }
    console.log(
      `${idx + 1}. [${m.team.toUpperCase()}] ${m.name} (${m.role}) -> /team/${m.slug} | photoUrl: "${m.photoUrl}" ${isLocal ? '✓' : '❌ INVALID'}`
    );
  });

  console.log(`\nInvalid Photo URLs: ${invalidPhotoCount}`);
  console.log('-----------------------------------');

  await prisma.$disconnect();
  await pool.end();
}

verify().catch((e) => {
  console.error('Verification error:', e);
  process.exit(1);
});
