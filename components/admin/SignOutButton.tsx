'use client';

import React from 'react';
import { signOut } from 'next-auth/react';
import { LogOut } from 'lucide-react';

export function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/admin/login' })}
      className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-gray-300 hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-400 transition-colors"
    >
      <LogOut className="h-3.5 w-3.5" />
      <span>Sign Out</span>
    </button>
  );
}
