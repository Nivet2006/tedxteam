import { PrismaClient, Team } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import bcrypt from 'bcrypt';

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding TEDxGCEM database with 26 real team members...');

  // 1. Create or update Admin Account from ENV
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@tedxgcem.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'TEDxGCEM2026!SecureAdminPass';
  const passwordHash = await bcrypt.hash(adminPassword, 10);

  await prisma.adminUser.upsert({
    where: { email: adminEmail.toLowerCase() },
    update: { passwordHash },
    create: {
      email: adminEmail.toLowerCase(),
      passwordHash,
    },
  });
  console.log(`Admin user configured: ${adminEmail}`);

  // 2. Exact 26-Member Roster Specs
  const membersData: {
    slug: string;
    name: string;
    role: string;
    team: Team;
    oneLiner: string;
    bio: string;
    contribution: string;
    interests: string[];
    photoUrl: string;
  }[] = [
    // Leadership (4)
    {
      slug: 'bharath-m',
      name: 'Bharath M',
      role: 'Executive Producer',
      team: Team.leadership,
      oneLiner: 'Steering TEDxGCEM vision, strategic execution, and grand stage production.',
      bio: 'Bharath M is the Executive Producer of TEDxGCEM 2026, overseeing overall conference direction, institutional partnerships, and stage excellence.',
      contribution: 'Directing overarching event strategy, venue execution, and cross-functional leadership teams.',
      interests: ['Event Production', 'Leadership', 'Strategic Vision'],
      photoUrl: '/members/placeholder.png',
    },
    {
      slug: 'bhargav-bhat',
      name: 'Bhargav Bhat',
      role: 'Production Director',
      team: Team.leadership,
      oneLiner: 'Orchestrating technical stage design, audio-visual excellence, and live stream engineering.',
      bio: 'Bhargav Bhat leads stage mechanics, technical direction, and AV production for TEDxGCEM 2026.',
      contribution: 'Supervising stage construction, lighting design, and live broadcast engineering.',
      interests: ['Stage Production', 'Lighting Engineering', 'Live Streaming'],
      photoUrl: '/members/placeholder.png',
    },
    {
      slug: 'manoj-v',
      name: 'Manoj V',
      role: 'Event Director',
      team: Team.leadership,
      oneLiner: 'Ensuring seamless event flow, attendee experience, and operational precision.',
      bio: 'Manoj V coordinates event day execution, attendee hosting, and timeline management for TEDxGCEM 2026.',
      contribution: 'Managing master event schedule, stage protocol, and attendee experience teams.',
      interests: ['Event Management', 'Operations', 'Experience Design'],
      photoUrl: '/members/placeholder.png',
    },
    {
      slug: 'vinay-s',
      name: 'Vinay S',
      role: 'Operations Director',
      team: Team.leadership,
      oneLiner: 'Building infrastructure, logistics framework, and venue security protocols.',
      bio: 'Vinay S manages venue logistics, security clearance, supplier coordination, and crowd movement.',
      contribution: 'Lead operational strategist for venue logistics, badge control, and emergency planning.',
      interests: ['Logistics', 'Operations Engineering', 'Security Control'],
      photoUrl: '/members/placeholder.png',
    },

    // Creative (5)
    {
      slug: 'akhila-g',
      name: 'Akhila G',
      role: 'Design Director',
      team: Team.creative,
      oneLiner: 'Crafting expressive brand identity, spatial design, and visual aesthetics.',
      bio: 'Akhila G shapes the visual universe of TEDxGCEM 2026, from physical badge design to environmental graphics.',
      contribution: 'Lead designer for the 2026 theme identity, digital branding, and stage backdrops.',
      interests: ['Brand Design', 'Typography', 'Environmental Graphics'],
      photoUrl: '/members/placeholder.png',
    },
    {
      slug: 'thanisashri-ss',
      name: 'Thanisashri S S',
      role: 'Creative Director',
      team: Team.creative,
      oneLiner: 'Blending artistic vision with immersive multi-sensory audience touchpoints.',
      bio: 'Thanisashri S S directs creative direction, campaign artwork, and thematic storytelling assets.',
      contribution: 'Directing visual narrative, motion design direction, and promo campaign aesthetics.',
      interests: ['Creative Direction', 'Visual Arts', 'Motion Design'],
      photoUrl: '/members/placeholder.png',
    },
    {
      slug: 'shruti-sujatha-francis',
      name: 'Shruti Sujatha Francis',
      role: 'Concept Artist',
      team: Team.creative,
      oneLiner: 'Translating abstract conference themes into stunning visual artwork.',
      bio: 'Shruti Sujatha Francis creates custom illustrations, stage visual concepts, and promotional artwork.',
      contribution: 'Illustrated core theme assets, social graphics, and badge visual elements.',
      interests: ['Illustration', 'Concept Art', 'Digital Painting'],
      photoUrl: '/members/placeholder.png',
    },
    {
      slug: 'taruni-sri-reddy',
      name: 'K Taruni Sri Reddy',
      role: 'Concept Artist',
      team: Team.creative,
      oneLiner: 'Designing vibrant visual assets and interactive stage projections.',
      bio: 'K Taruni Sri Reddy focuses on digital illustration, poster art, and brand collaterals.',
      contribution: 'Created event collateral artwork, speaker intro cards, and badge graphics.',
      interests: ['Digital Art', 'Graphic Design', 'Visual Storytelling'],
      photoUrl: '/members/placeholder.png',
    },
    {
      slug: 'bushra-m',
      name: 'Bushra M Makandar',
      role: 'Creative Manager',
      team: Team.creative,
      oneLiner: 'Synchronizing creative deliverables, design assets, and production timelines.',
      bio: 'As the Creative Manager, I aim to bring ideas to life through creativity and impactful visuals. I’m excited to be part of the team and contribute towards making every TEDx experience successful, engaging, and memorable.',
      contribution: 'Coordinating graphic design sprint schedules and print production quality control.',
      interests: ['Design Operations', 'Project Management', 'UI/UX Design'],
      photoUrl: '/members/placeholder.png',
      linkedin: 'https://www.linkedin.com/in/bushra-makandar-a010a3364/',
    },

    // Curation (7)
    {
      slug: 'divyashree-rm',
      name: 'Divyashree RM',
      role: 'Curation Director',
      team: Team.curation,
      oneLiner: 'Unearthing ideas worth spreading and mentoring visionary keynotes.',
      bio: 'Divyashree RM leads the TEDxGCEM curation committee, identifying transformative ideas and shaping talk scripts.',
      contribution: 'Curated 12 keynote talks, directing speaker curation standards and talk rehearsal cycles.',
      interests: ['Speaker Curation', 'Idea Discovery', 'Storytelling'],
      photoUrl: '/members/placeholder.png',
      linkedin: 'https://www.linkedin.com/in/divyashree-rm',
    },
    {
      slug: 'challa-himasree',
      name: 'Challa Himasree',
      role: 'Curator',
      team: Team.curation,
      oneLiner: 'Distilling complex research into crisp, powerful 18-minute talks.',
      bio: 'I’m Challa Himasree, a member of the TEDxGCEM Curation Team, working to shape meaningful conversations by identifying, developing, and supporting ideas and speakers that align with our theme. I aim to contribute creativity, thoughtful curation, and attention to detail while helping create an experience that leaves a lasting impact on the audience.',
      contribution: 'Coached speakers through script drafting, slides preparation, and stage delivery.',
      interests: ['Script Editing', 'Keynote Coaching', 'Research'],
      photoUrl: '/members/placeholder.png',
      linkedin: 'https://www.linkedin.com/in/challa-himasree-935b51335',
    },
    {
      slug: 'vyshnavi-d',
      name: 'Vyshnavi D',
      role: 'Curator',
      team: Team.curation,
      oneLiner: 'Fostering intellectual diversity and compelling narrative arcs.',
      bio: 'As a Curator at TEDxGCEM, I aim to discover and shape ideas that spark curiosity, challenge perspectives, and inspire meaningful conversations. I’m excited to contribute to a team that brings diverse voices and thought-provoking stories to the TEDx stage.',
      contribution: 'Speaker alignment, content editing, and keynote sequence design.',
      interests: ['Public Speaking', 'Interdisciplinary Studies', 'Content Development'],
      photoUrl: '/members/placeholder.png',
      linkedin: 'https://www.linkedin.com/in/vyshnavid110623/',
    },
    {
      slug: 'charan-kumar-reddy',
      name: 'C Charan Kumar Reddy',
      role: 'Curator',
      team: Team.curation,
      oneLiner: 'Connecting ground-breaking local ideas with global TED audiences.',
      bio: 'As a Curator in the TEDx GCEM Curation Team, I aim to bring out the best possible talk from every speaker I work with. I look forward to contributing meaningfully to the team, learning new things, and continuously stepping out of my comfort zone to grow through this experience.',
      contribution: 'Researched regional innovators, coordinated talk rehearsals, and curated session themes.',
      interests: ['Innovation', 'Speaker Mentorship', 'Cultural History'],
      photoUrl: '/members/placeholder.png',
      linkedin: 'https://www.linkedin.com/in/chintaparthi-charan-kumar-reddy-255b57295?utm_source=share_via&utm_content=profile&utm_medium=member_android',
    },
    {
      slug: 'bhuvana-m',
      name: 'Bhuvana M',
      role: 'Curator',
      team: Team.curation,
      oneLiner: 'Structuring memorable talk trajectories and audience engagement beats.',
      bio: 'Bhuvana M focuses on speaker prep, slide deck design alignment, and stage confidence.',
      contribution: 'Curatorial research, speaker hospitality, and talk delivery coaching.',
      interests: ['Communication', 'Presentation Design', 'Audience Psychology'],
      photoUrl: '/members/placeholder.png',
    },
    {
      slug: 'spoorthi-n',
      name: 'Spoorthi N',
      role: 'Speaker Scout',
      team: Team.curation,
      oneLiner: 'Scouting undiscovered thinkers, pioneers, and changemakers.',
      bio: 'Spoorthi N leads outreach to prospective speakers, innovators, and community leaders.',
      contribution: 'Identified breakthrough local talent and managed speaker nominations.',
      interests: ['Talent Discovery', 'Community Outreach', 'Research'],
      photoUrl: '/members/placeholder.png',
    },
    {
      slug: 'meghana-mallarapu',
      name: 'Meghana Mallarapu',
      role: 'Speaker Scout',
      team: Team.curation,
      oneLiner: 'Tracking emerging trends and recruiting impactful TEDx presenters.',
      bio: 'Meghana Mallarapu researches emerging tech, sustainability, and social impact pioneers.',
      contribution: 'Vetted 50+ speaker applications and coordinated preliminary interviews.',
      interests: ['Research', 'Social Impact', 'Scouting'],
      photoUrl: '/members/placeholder.png',
    },

    // Partnerships (4)
    {
      slug: 'divya-c',
      name: 'Divya C',
      role: 'Partnership Director',
      team: Team.partnerships,
      oneLiner: 'Cultivating strategic corporate alliances and sponsor ecosystems.',
      bio: 'Divya C directs corporate sponsorship, grant funding, and strategic partner relationships.',
      contribution: 'Secured primary event sponsors and managed brand integration deliverables.',
      interests: ['Corporate Partnerships', 'Business Development', 'Sponsorship Strategy'],
      photoUrl: '/members/placeholder.png',
    },
    {
      slug: 'vinayaka',
      name: 'Vinayaka V',
      role: 'Partnership Director',
      team: Team.partnerships,
      oneLiner: 'Aligning corporate visionaries with the TEDx mission.',
      bio: 'As Partnership Director, I focus on building strategic alliances and fostering high-value collaborations that drive mutual growth and expand our network. My goal is to bridge the gap between our team and key industry stakeholders to unlock new opportunities for innovation. I am thrilled to work alongside such a talented group to help bring our shared vision to life.',
      contribution: 'Established key corporate partnerships and sponsor booth installations.',
      interests: ['Partnerships', 'Financial Strategy', 'Negotiation'],
      photoUrl: '/members/placeholder.png',
      linkedin: 'https://www.linkedin.com/in/vinayaka464',
    },
    {
      slug: 'sagar-singh',
      name: 'Sagar Singh',
      role: 'Partnership Lead',
      team: Team.partnerships,
      oneLiner: 'Driving sponsor onboarding, fulfillment, and brand placement.',
      bio: 'Sagar Singh coordinates sponsor booth logistics, VIP hospitality, and partner visibility.',
      contribution: 'Managed partner relations, contract fulfillment, and sponsor lounge setup.',
      interests: ['Client Relations', 'Event Sponsorship', 'Marketing'],
      photoUrl: '/members/placeholder.png',
    },
    {
      slug: 'shivaprasad-patil',
      name: 'Shivaprasad V Patil',
      role: 'Partnership Lead',
      team: Team.partnerships,
      oneLiner: 'Building sustainable brand collaborations and community support.',
      bio: 'As the Partnership Lead at TEDx, I focus on building meaningful partnerships and strong collaborations to support the event’s vision. I aim to connect with organizations and individuals to create an impactful and memorable TEDxGCEM experience.',
      contribution: 'Oversaw local merchant partnerships, food/beverage sponsors, and partner kits.',
      interests: ['Community Partnerships', 'Business Outreach', 'Networking'],
      photoUrl: '/members/placeholder.png',
      linkedin: 'https://www.linkedin.com/in/shivaprasad-v-patil-629259326',
    },

    // Media (4)
    {
      slug: 'kruthin-h',
      name: 'Kruthin H',
      role: 'Campaign Director',
      team: Team.media,
      oneLiner: 'Igniting viral digital campaigns and high-octane video trailers.',
      bio: 'Kruthin H directs digital media marketing, campaign rollouts, and promotional video releases.',
      contribution: 'Spearheaded the 2026 ticket launch teaser campaign generating 50k+ views.',
      interests: ['Campaign Strategy', 'Video Production', 'Growth Marketing'],
      photoUrl: '/members/placeholder.png',
    },
    {
      slug: 'anusha',
      name: 'Anusha',
      role: 'Digital Media Manager',
      team: Team.media,
      oneLiner: 'Managing social channels, audience engagement, and real-time event updates.',
      bio: 'Anusha manages official Instagram, LinkedIn, and Twitter channels for TEDxGCEM 2026.',
      contribution: 'Executing daily social content calendar, live tweeting, and audience interactions.',
      interests: ['Social Media Management', 'Content Creation', 'Digital PR'],
      photoUrl: '/members/placeholder.png',
    },
    {
      slug: 'riktriti',
      name: 'Riktriti',
      role: 'Digital Media Manager',
      team: Team.media,
      oneLiner: 'Curating dynamic visual stories and social reel campaigns.',
      bio: 'Riktriti creates short-form reels, speaker teasers, and interactive audience stories.',
      contribution: 'Produced 20+ short video reels and live event day social highlights.',
      interests: ['Short-Form Video', 'Reels Strategy', 'Digital Marketing'],
      photoUrl: '/members/placeholder.png',
    },
    {
      slug: 'mallikarjuna-l',
      name: 'Mallikarjuna L',
      role: 'Content Creator',
      team: Team.media,
      oneLiner: 'Writing magnetic copy, speaker spotlights, and event articles.',
      bio: 'Mallikarjuna L writes editorial copy, press releases, and social media captions.',
      contribution: 'Authored speaker announcement copy, press notes, and website stories.',
      interests: ['Copywriting', 'Content Writing', 'Journalism'],
      photoUrl: '/members/placeholder.png',
    },

    // Technology (2)
    {
      slug: 'nived-shaji',
      name: 'Nived Shaji',
      role: 'Technical Lead',
      team: Team.technology,
      oneLiner: 'Architecting digital identity platforms, badge QR systems, and web apps.',
      bio: 'Nived Shaji leads web architecture, full-stack development, and digital experience engineering for TEDxGCEM 2026.',
      contribution: 'Built the TEDxGCEM Digital Identity System, badge QR engine, scan tracking APIs, and admin platform.',
      interests: ['Full-Stack Engineering', 'Next.js', 'Prisma', 'System Architecture'],
      photoUrl: '/members/placeholder.png',
      instagram: 'https://www.instagram.com/nivet.2006',
      github: 'https://github.com/Nivet2006',
    },
    {
      slug: 'yeshwanth',
      name: 'Yeshwanth',
      role: 'Technical Lead',
      team: Team.technology,
      oneLiner: 'Engineering cloud infrastructure, database systems, and interactive UI.',
      bio: 'Yeshwanth develops backend systems, database schemas, and interactive web elements for TEDxGCEM 2026.',
      contribution: 'Engineered cloud database migrations, scan analytics tracking, and frontend components.',
      interests: ['Cloud Infrastructure', 'Database Systems', 'React', 'DevOps'],
      photoUrl: '/members/placeholder.png',
    },
  ];

  // 3. Upsert Members to ensure Idempotency
  for (const m of membersData) {
    const member = await prisma.member.upsert({
      where: { slug: m.slug },
      update: {
        name: m.name,
        role: m.role,
        team: m.team,
        oneLiner: m.oneLiner,
        bio: m.bio,
        contribution: m.contribution,
        interests: JSON.stringify(m.interests),
        photoUrl: m.photoUrl,
        instagram: (m as any).instagram || null,
        github: (m as any).github || null,
      },
      create: {
        slug: m.slug,
        name: m.name,
        role: m.role,
        team: m.team,
        oneLiner: m.oneLiner,
        bio: m.bio,
        contribution: m.contribution,
        interests: JSON.stringify(m.interests),
        photoUrl: m.photoUrl,
        instagram: (m as any).instagram || null,
        github: (m as any).github || null,
        scanCount: Math.floor(Math.random() * 50) + 10,
      },
    });

    // Create 3 sample scan events per member if none exist
    const scanCount = await prisma.scanEvent.count({ where: { memberId: member.id } });
    if (scanCount === 0) {
      for (let i = 0; i < 3; i++) {
        const daysAgo = i * 2;
        const scanDate = new Date();
        scanDate.setDate(scanDate.getDate() - daysAgo);

        await prisma.scanEvent.create({
          data: {
            memberId: member.id,
            scannedAt: scanDate,
            source: i % 2 === 0 ? 'qr' : 'direct-link',
          },
        });
      }
    }
  }

  // 4. Remove any stale members not in the official 26-member list
  const validSlugs = membersData.map((m) => m.slug);
  const deleted = await prisma.member.deleteMany({
    where: {
      slug: { notIn: validSlugs },
    },
  });
  if (deleted.count > 0) {
    console.log(`Cleaned up ${deleted.count} obsolete non-roster member records.`);
  }

  console.log(`Idempotent seeding completed cleanly for ${membersData.length} team members.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
