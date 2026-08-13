import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const member = await prisma.member.findUnique({
      where: { id },
      include: {
        scans: {
          orderBy: { scannedAt: 'desc' },
          take: 50,
        },
      },
    });

    if (!member) {
      return NextResponse.json({ error: 'Member not found' }, { status: 404 });
    }

    return NextResponse.json(member);
  } catch (error) {
    console.error('Error fetching member:', error);
    return NextResponse.json({ error: 'Failed to fetch member' }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    const existingMember = await prisma.member.findUnique({ where: { id } });
    if (!existingMember) {
      return NextResponse.json({ error: 'Member not found' }, { status: 404 });
    }

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

    const updatedData: Record<string, unknown> = {};

    if (name !== undefined) updatedData.name = name;
    if (role !== undefined) updatedData.role = role;
    if (team !== undefined) updatedData.team = team;
    if (oneLiner !== undefined) updatedData.oneLiner = oneLiner;
    if (bio !== undefined) updatedData.bio = bio;
    if (contribution !== undefined) updatedData.contribution = contribution;
    if (interests !== undefined) {
      updatedData.interests = Array.isArray(interests)
        ? JSON.stringify(interests)
        : typeof interests === 'string'
        ? interests
        : JSON.stringify([]);
    }
    if (photoUrl !== undefined) updatedData.photoUrl = photoUrl;
    if (linkedin !== undefined) updatedData.linkedin = linkedin;
    if (instagram !== undefined) updatedData.instagram = instagram;
    if (github !== undefined) updatedData.github = github;
    if (portfolio !== undefined) updatedData.portfolio = portfolio;

    const member = await prisma.member.update({
      where: { id },
      data: updatedData,
    });

    return NextResponse.json(member);
  } catch (error) {
    console.error('Error updating member:', error);
    return NextResponse.json({ error: 'Failed to update member' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    await prisma.member.delete({ where: { id } });

    return NextResponse.json({ success: true, message: 'Member deleted' });
  } catch (error) {
    console.error('Error deleting member:', error);
    return NextResponse.json({ error: 'Failed to delete member' }, { status: 500 });
  }
}
