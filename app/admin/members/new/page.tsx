import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { MemberForm } from '@/components/admin/MemberForm';

export default async function NewMemberPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/admin/login');
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-white">Add New Team Member</h1>
        <p className="text-xs text-gray-400 mt-1">
          Create a new profile page and auto-generate physical badge QR destination URL
        </p>
      </div>

      <MemberForm />
    </div>
  );
}
