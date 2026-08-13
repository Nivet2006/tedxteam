'use client';

import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

interface ScanEventData {
  scannedAt: string | Date;
  source?: string | null;
}

interface ScanChartProps {
  scans: ScanEventData[];
  memberName?: string;
}

export function ScanChart({ scans, memberName }: ScanChartProps) {
  if (!scans || scans.length === 0) {
    return (
      <div className="flex h-48 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.04] text-sm text-gray-500 backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
        No scan activity recorded yet.
      </div>
    );
  }

  // Aggregate scans by day for the chart
  const scansByDate = scans.reduce<Record<string, { total: number; qr: number; direct: number }>>(
    (acc, scan) => {
      const dateStr = new Date(scan.scannedAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
      if (!acc[dateStr]) {
        acc[dateStr] = { total: 0, qr: 0, direct: 0 };
      }
      acc[dateStr].total += 1;
      if (scan.source === 'qr') {
        acc[dateStr].qr += 1;
      } else {
        acc[dateStr].direct += 1;
      }
      return acc;
    },
    {}
  );

  const chartData = Object.entries(scansByDate).map(([date, counts]) => ({
    date,
    QR: counts.qr,
    Direct: counts.direct,
    Total: counts.total,
  }));

  return (
    <div className="rounded-2xl border border-white/15 bg-white/[0.04] p-6 backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-semibold text-white">
          Scan Analytics {memberName ? `— ${memberName}` : ''}
        </h3>
        <span className="text-xs text-gray-400">Total Scans: {scans.length}</span>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="date" stroke="#94A3B8" fontSize={12} tickLine={false} />
            <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} allowDecimals={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0F172A',
                borderColor: '#334155',
                borderRadius: '8px',
                color: '#FFF',
              }}
            />
            <Bar dataKey="QR" fill="#EB0028" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Direct" fill="#3B82F6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex justify-end gap-4 text-xs">
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#EB0028]" />
          <span className="text-gray-300">QR Badge Scan</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-blue-500" />
          <span className="text-gray-300">Direct Link</span>
        </div>
      </div>
    </div>
  );
}
