'use client';

import React, { useState } from 'react';
import { MemberTable, MemberTableItem } from '@/components/admin/MemberTable';
import { ScanChart } from '@/components/admin/ScanChart';

interface ClientMemberItem extends MemberTableItem {
  scans: { scannedAt: string; source?: string | null }[];
}

interface AdminDashboardClientProps {
  members: ClientMemberItem[];
  allScans: { scannedAt: Date | string; source?: string | null }[];
}

export function AdminDashboardClient({ members, allScans }: AdminDashboardClientProps) {
  const [selectedMember, setSelectedMember] = useState<ClientMemberItem | null>(null);

  const activeScans = selectedMember ? selectedMember.scans : allScans;

  return (
    <div className="space-y-8">
      {/* Scan Chart Section */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold">
            {selectedMember ? `Filtered Member Chart: ${selectedMember.name}` : 'Overall Scan Activity (All Members)'}
          </span>

          {selectedMember && (
            <button
              onClick={() => setSelectedMember(null)}
              className="text-xs text-red-400 hover:underline"
            >
              Reset to All Scans
            </button>
          )}
        </div>
        <ScanChart scans={activeScans} memberName={selectedMember?.name} />
      </div>

      {/* Member Table Section */}
      <div>
        <h2 className="text-lg font-bold text-white mb-4">Team Directory Administration</h2>
        <MemberTable
          members={members}
          onSelectMemberForChart={(m) => setSelectedMember(m as ClientMemberItem)}
        />
      </div>
    </div>
  );
}
