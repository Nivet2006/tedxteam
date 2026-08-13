import React from 'react';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#06070B] text-white">
      <div className="relative flex flex-col items-center gap-4">
        {/* Pulsing TEDx Red Ring */}
        <div className="h-14 w-14 animate-spin rounded-full border-2 border-white/10 border-t-[#EB0028]" />
        <span className="text-xs uppercase tracking-widest text-gray-400 font-semibold animate-pulse">
          TEDxGCEM 2026
        </span>
      </div>
    </div>
  );
}
