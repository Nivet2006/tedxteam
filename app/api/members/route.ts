import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const members = await prisma.member.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: { scans: true },
        },
      },
    });

    return NextResponse.json(members);
  } catch (error) {
    console.error('Error fetching members:', error);
    return NextResponse.json({ error: 'Failed to fetch members' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      name,
      role,
      team,
      oneLiner,
      bio,
      contribution,
      interests,
      photoUrl,
      linkedin,
      instagram,
      github,
      portfolio,
    } = body;

    if (!name || !role || !team || !oneLiner || !bio || !contribution || !photoUrl) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Auto-generate unique slug from name
    let baseSlug = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-');

    let slug = baseSlug;
    let counter = 1;
    while (await prisma.member.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    const member = await prisma.member.create({
      data: {
        slug,
        name,
        role,
        team,
        oneLiner,
        bio,
        contribution,
        interests: Array.isArray(interests) ? JSON.stringify(interests) : JSON.stringify([]),
        photoUrl,
        linkedin: linkedin || null,
        instagram: instagram || null,
        github: github || null,
        portfolio: portfolio || null,
      },
    });

    return NextResponse.json(member, { status: 201 });
  } catch (error) {
    console.error('Error creating member:', error);
    return NextResponse.json({ error: 'Failed to create member' }, { status: 500 });
  }
}
