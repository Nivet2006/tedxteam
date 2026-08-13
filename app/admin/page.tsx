import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { AdminDashboardClient } from '@/components/admin/AdminDashboardClient';
import { Plus, Users, QrCode, TrendingUp } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const members = await prisma.member.findMany({
    orderBy: { scanCount: 'desc' },
    include: {
      scans: {
        orderBy: { scannedAt: 'desc' },
        take: 100,
      },
    },
  });

  const totalMembers = members.length;
  const totalScans = members.reduce((acc, m) => acc + m.scanCount, 0);
  const topMember = members[0];

  // All scans combined for overall analytics chart
  const allScans = members.flatMap((m) => m.scans);

  // Formatted items for client table
  const tableMembers = members.map((m) => ({
    id: m.id,
    slug: m.slug,
    name: m.name,
    role: m.role,
    team: m.team,
    photoUrl: m.photoUrl,
    scanCount: m.scanCount,
    updatedAt: m.updatedAt.toISOString(),
    scans: m.scans.map((s) => ({
      scannedAt: s.scannedAt.toISOString(),
      source: s.source || 'direct',
    })),
  }));

  return (
    <div className="space-y-8">
      {/* Dashboard Top Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">
            Team Management & Scan Analytics
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Real-time badge QR scan metrics and team directory administration
          </p>
        </div>

        <Link
          href="/admin/members/new"
          className="inline-flex items-center gap-2 rounded-xl bg-[#EB0028] px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:bg-red-700 backdrop-blur-md border border-red-400/30"
        >
          <Plus className="h-4 w-4" />
          <span>Add Team Member</span>
        </Link>
      </div>

      {/* Metrics Cards */}
      <div className="grid gap-6 sm:grid-cols-3">
        <div className="rounded-2xl border border-white/15 bg-white/[0.04] p-6 backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Total Team Members
            </span>
            <Users className="h-5 w-5 text-blue-400" />
          </div>
          <p className="mt-4 text-3xl font-extrabold text-white">{totalMembers}</p>
          <span className="text-xs text-gray-500">Across 6 functional team groups</span>
        </div>

        <div className="rounded-2xl border border-white/15 bg-white/[0.04] p-6 backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Total QR & Badge Scans
            </span>
            <QrCode className="h-5 w-5 text-[#EB0028]" />
          </div>
          <p className="mt-4 text-3xl font-extrabold text-white">{totalScans}</p>
          <span className="text-xs text-gray-500">Tracked in DB via /api/track-scan</span>
        </div>

        <div className="rounded-2xl border border-white/15 bg-white/[0.04] p-6 backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Most Scanned Profile
            </span>
            <TrendingUp className="h-5 w-5 text-emerald-400" />
          </div>
          <p className="mt-4 text-xl font-bold text-white truncate">
            {topMember ? topMember.name : 'N/A'}
          </p>
          <span className="text-xs text-emerald-400 font-medium">
            {topMember ? `${topMember.scanCount} scans` : '0 scans'}
          </span>
        </div>
      </div>

      {/* Analytics Chart & Interactive Table */}
      <AdminDashboardClient members={tableMembers} allScans={allScans} />
    </div>
  );
}
