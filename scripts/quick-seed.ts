/**
 * Quick Production Seed — 26 Real TEDxGCEM Members
 * Run: npx dotenv-cli -e .env -- npx tsx scripts/quick-seed.ts
 */

import { PrismaClient, Team } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const members: {
  slug: string;
  name: string;
  role: string;
  team: Team;
}[] = [
  // Leadership
  { slug: 'bharath-m',    name: 'Bharath M',          role: 'Executive Producer',   team: 'leadership' },
  { slug: 'manoj-v',      name: 'Manoj V',             role: 'Event Director',       team: 'leadership' },
  { slug: 'bhargav-bhat', name: 'Bhargav Bhat',        role: 'Production Director',  team: 'leadership' },
  { slug: 'vinay-s',      name: 'Vinay S',             role: 'Operations Director',  team: 'leadership' },

  // Creative
  { slug: 'akhila-g',              name: 'Akhila G',              role: 'Design Director',  team: 'creative' },
  { slug: 'thanisashri-ss',        name: 'Thanisashri S S',       role: 'Creative Director', team: 'creative' },
  { slug: 'bushra-m',              name: 'Bushra M',              role: 'Creative Manager', team: 'creative' },
  { slug: 'shruti-sujatha-francis',name: 'Shruti Sujatha Francis',role: 'Concept Artist',   team: 'creative' },
  { slug: 'taruni-sri-reddy',      name: 'K Taruni Sri Reddy',    role: 'Concept Artist',   team: 'creative' },

  // Curation
  { slug: 'divyashree-rm',    name: 'Divyashree RM',        role: 'Curation Director', team: 'curation' },
  { slug: 'vyshnavi-d',       name: 'Vyshnavi D',           role: 'Curator',           team: 'curation' },
  { slug: 'charan-kumar-reddy', name: 'C Charan Kumar Reddy', role: 'Curator',          team: 'curation' },
  { slug: 'bhuvana-m',        name: 'Bhuvana M',            role: 'Curator',           team: 'curation' },
  { slug: 'challa-himasree',  name: 'Challa Himasree',      role: 'Curator',           team: 'curation' },
  { slug: 'spoorthi-n',       name: 'Spoorthi N',           role: 'Speaker Scout',     team: 'curation' },
  { slug: 'meghana-mallarapu',name: 'Meghana Mallarapu',   role: 'Speaker Scout',     team: 'curation' },

  // Partnerships
  { slug: 'divya-c',          name: 'Divya C',          role: 'Partnership Director', team: 'partnerships' },
  { slug: 'vinayaka',         name: 'Vinayaka',         role: 'Partnership Director', team: 'partnerships' },
  { slug: 'sagar-singh',      name: 'Sagar Singh',      role: 'Partnership Lead',     team: 'partnerships' },
  { slug: 'shivaprasad-patil',name: 'Shivaprasad Patil',role: 'Partnership Lead',    team: 'partnerships' },

  // Media
  { slug: 'kruthin-h',      name: 'Kruthin H',      role: 'Campaign Director',    team: 'media' },
  { slug: 'anusha',         name: 'Anusha',          role: 'Digital Media Manager',team: 'media' },
  { slug: 'riktriti',       name: 'Riktriti',        role: 'Digital Media Manager',team: 'media' },
  { slug: 'mallikarjuna-l', name: 'Mallikarjuna L', role: 'Content Creator',      team: 'media' },

  // Technology
  { slug: 'nived-shaji', name: 'Nived Shaji', role: 'Technical Lead', team: 'technology' },
  { slug: 'yeshwanth',   name: 'Yeshwanth',   role: 'Technical Lead', team: 'technology' },
];

async function main() {
  console.log(`Seeding ${members.length} members...\n`);

  for (const m of members) {
    await prisma.member.upsert({
      where: { slug: m.slug },
      update: { name: m.name, role: m.role, team: m.team },
      create: {
        slug: m.slug,
        name: m.name,
        role: m.role,
        team: m.team,
        oneLiner: `${m.role} at TEDxGCEM 2026`,
        bio: `${m.name} is a valued member of the TEDxGCEM ${m.team} team.`,
        contribution: `As ${m.role}, ${m.name} contributes to making TEDxGCEM 2026 a remarkable event.`,
        interests: '[]',
        photoUrl: '/members/placeholder.png',
      },
    });
    console.log(`  ✅  ${m.name} (${m.role})`);
  }

  console.log(`\n🚀  Done! ${members.length} members seeded.`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); await pool.end(); });
