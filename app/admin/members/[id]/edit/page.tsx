import React from 'react';
import { notFound, redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { MemberForm } from '@/components/admin/MemberForm';

export default async function EditMemberPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/admin/login');
  }

  const { id } = await params;
  const member = await prisma.member.findUnique({
    where: { id },
  });

  if (!member) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-white">Edit Profile: {member.name}</h1>
        <p className="text-xs text-gray-400 mt-1">
          Update member credentials, role theme, or generate badge QR code
        </p>
      </div>

      <MemberForm initialData={member} />
    </div>
  );
}
