import React from 'react';
import { MemberForm } from '@/components/admin/MemberForm';

export default function NewMemberPage() {
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
