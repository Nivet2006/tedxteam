import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { LayoutDashboard, PlusCircle, ShieldCheck } from 'lucide-react';
import { SignOutButton } from '@/components/admin/SignOutButton';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  // If unauthenticated (e.g. visiting /admin/login or unauthenticated route)
  if (!session) {
    return (
      <div className="min-h-screen bg-[#07090E] text-slate-100 selection:bg-red-500 selection:text-white">
        {children}
      </div>
    );
  }

  // Authenticated Admin Dashboard Layout
  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 selection:bg-red-500 selection:text-white overflow-x-hidden">
      {/* Top Admin Navigation Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl px-4 sm:px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-4 sm:gap-6">
            <Link href="/admin" className="flex items-center gap-2">
              <Image
                src="/tedxgcem.png"
                alt="TEDxGCEM Logo"
                width={130}
                height={35}
                priority
                className="h-7 w-auto object-contain"
              />
              <span className="text-gray-400 font-normal text-xs uppercase tracking-widest border-l border-white/20 pl-2">
                Admin
              </span>
            </Link>

            <nav className="flex items-center gap-2 sm:gap-4 text-xs font-semibold">
              <Link
                href="/admin"
                className="flex min-h-[40px] items-center gap-1.5 rounded-lg px-3 py-1.5 text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
              >
                <LayoutDashboard className="h-4 w-4 text-[#EB0028]" />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>

              <Link
                href="/admin/members/new"
                className="flex min-h-[40px] items-center gap-1.5 rounded-lg px-3 py-1.5 text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
              >
                <PlusCircle className="h-4 w-4 text-emerald-400" />
                <span className="hidden sm:inline">Add Member</span>
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/30 px-3 py-1 text-xs text-emerald-400">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Authenticated Admin</span>
            </div>

            <SignOutButton />
          </div>
        </div>
      </header>

      {/* Admin Content Container */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-6 sm:py-8">{children}</main>
    </div>
  );
}
