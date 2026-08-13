import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { ProfileTemplate } from '@/components/ProfileTemplate';

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const member = await prisma.member.findUnique({
    where: { slug },
  });

  if (!member) {
    return { title: 'Member Not Found | TEDxGCEM' };
  }

  return {
    title: `${member.name} — ${member.role} | TEDxGCEM Team`,
    description: member.oneLiner,
    openGraph: {
      title: `${member.name} — ${member.role}`,
      description: member.oneLiner,
      images: [member.photoUrl],
    },
  };
}

export default async function MemberProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const member = await prisma.member.findUnique({
    where: { slug },
  });

  if (!member) {
    notFound();
  }

  return <ProfileTemplate member={member} />;
}
