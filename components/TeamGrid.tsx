'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { getTeamTheme, teamThemes, TeamGroup } from '@/lib/themes';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface GridMember {
  id: string;
  slug: string;
  name: string;
  role: string;
  team: string;
  oneLiner: string;
  photoUrl: string;
  scanCount: number;
}

const FALLBACK_PHOTO = '/members/placeholder.png';

function getValidPhotoUrl(url?: string | null): string {
  if (!url || typeof url !== 'string') return FALLBACK_PHOTO;
  const trimmed = url.trim();
  if (trimmed.startsWith('/') && !trimmed.startsWith('//')) {
    return trimmed;
  }
  return FALLBACK_PHOTO;
}

export function TeamGrid({ members }: { members: GridMember[] }) {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredMembers =
    activeFilter === 'all'
      ? members
      : members.filter((m) => m.team.toLowerCase() === activeFilter.toLowerCase());

  useEffect(() => {
    if (!gridRef.current) return;

    const cards = gridRef.current.querySelectorAll('.team-card');
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.05,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 90%',
          },
        }
      );
    });

    return () => ctx.revert();
  }, [filteredMembers]);

  const filterCategories = ['all', ...Object.keys(teamThemes)];

  return (
    <section className="space-y-6 sm:space-y-8 w-full">
      {/* Mobile-Friendly Horizontally Scrollable Filter Chips */}
      <div className="w-full overflow-x-auto no-scrollbar py-2 -mx-4 px-4 sm:mx-0 sm:px-0">
        <div className="flex items-center justify-start sm:justify-center gap-2.5 min-w-max">
          {filterCategories.map((cat) => {
            const isActive = activeFilter === cat;
            const theme = cat !== 'all' ? teamThemes[cat as TeamGroup] : null;

            return (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`min-h-[44px] rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider transition-all backdrop-blur-md flex items-center justify-center ${isActive
                    ? 'bg-[#EB0028] text-white shadow-lg shadow-red-600/30 scale-105 border border-red-400/40'
                    : 'bg-white/5 text-gray-300 border border-white/10 hover:bg-white/15 hover:border-white/20 hover:text-white'
                  }`}
              >
                {cat === 'all' ? 'All Members' : theme?.name || cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Cards Grid */}
      <div ref={gridRef} className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full">
        <AnimatePresence mode="popLayout">
          {filteredMembers.map((member) => {
            const theme = getTeamTheme(member.team);
            const imageSrc = failedImages[member.id]
              ? FALLBACK_PHOTO
              : getValidPhotoUrl(member.photoUrl);

            return (
              <motion.div
                key={member.id}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.3 }}
                className="team-card group relative overflow-hidden rounded-3xl border p-4 sm:p-5 backdrop-blur-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_16px_40px_rgba(0,0,0,0.5)] shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] flex flex-col justify-between"
                style={{
                  borderColor: theme.borderColor,
                  backgroundColor: theme.cardBg,
                }}
              >
                {/* Glass Light Reflection Gradient */}
                <div className="pointer-events-none absolute -inset-px rounded-3xl bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Accent Glow on Hover */}
                <div
                  className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    boxShadow: `inset 0 0 35px ${theme.accentGlow}`,
                  }}
                />

                {/* Photo Container */}
                <div>
                  <div className="relative aspect-[4/4.5] w-full overflow-hidden rounded-2xl border border-white/10 shadow-inner">
                    <Image
                      src={imageSrc}
                      alt={member.name}
                      fill
                      onError={() => setFailedImages((prev) => ({ ...prev, [member.id]: true }))}
                      sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />

                    {/* Team Group Badge */}
                    <div className="absolute top-3 left-3">
                      <span
                        className={`inline-block rounded-full border px-2.5 py-0.5 text-[10px] uppercase font-bold tracking-wider backdrop-blur-md ${theme.badgeStyle}`}
                      >
                        {theme.name}
                      </span>
                    </div>
                  </div>

                  {/* Info Text */}
                  <div className="relative z-10 mt-4 space-y-1.5">
                    <span
                      className="text-xs font-semibold uppercase tracking-widest block"
                      style={{ color: theme.accentColor }}
                    >
                      {member.role}
                    </span>

                    <h3 className="text-xl font-bold text-white group-hover:text-red-400 transition-colors break-words">
                      {member.name}
                    </h3>

                    <p className="text-xs text-gray-300 line-clamp-2 leading-relaxed font-light">
                      &ldquo;{member.oneLiner}&rdquo;
                    </p>
                  </div>
                </div>

                {/* Action Link */}
                <div className="relative z-10 mt-4 border-t border-white/10 pt-3 flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-wider text-gray-400 font-medium">
                     
                  </span>

                  <Link
                    href={`/team/${member.slug}`}
                    className="inline-flex min-h-[44px] items-center gap-1.5 text-xs font-bold text-white group-hover:text-[#EB0028] transition-colors"
                  >
                    <span>View Profile</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </section>
  );
}
