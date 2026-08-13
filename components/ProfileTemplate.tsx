'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, Sparkles, UserCheck } from 'lucide-react';
import { ThemeProvider } from '@/components/ThemeProvider';
import { SocialLinks } from '@/components/SocialLinks';
import { getTeamTheme } from '@/lib/themes';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface MemberData {
  id: string;
  slug: string;
  name: string;
  role: string;
  team: string;
  oneLiner: string;
  bio: string;
  contribution: string;
  interests: string;
  photoUrl: string;
  linkedin?: string | null;
  instagram?: string | null;
  github?: string | null;
  portfolio?: string | null;
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

export function ProfileTemplate({ member }: { member: MemberData }) {
  const searchParams = useSearchParams();
  const sourceParam = searchParams.get('src') || 'direct-link';
  const theme = getTeamTheme(member.team);

  const [imageSrc, setImageSrc] = useState(() => getValidPhotoUrl(member.photoUrl));
  const photoRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement>(null);

  let parsedInterests: string[] = [];
  try {
    if (member.interests) {
      parsedInterests = JSON.parse(member.interests);
    }
  } catch {
    parsedInterests = [];
  }

  useEffect(() => {
    fetch(`/api/track-scan/${member.slug}?src=${encodeURIComponent(sourceParam)}`, {
      method: 'POST',
    }).catch((err) => console.error('Scan tracking fetch error:', err));
  }, [member.slug, sourceParam]);

  useEffect(() => {
    if (!photoRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(photoRef.current, {
        yPercent: 10,
        ease: 'none',
        scrollTrigger: {
          trigger: photoRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <ThemeProvider team={member.team}>
      <div className="relative min-h-screen overflow-x-hidden selection:bg-red-500 selection:text-white">
        <div
          className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full blur-[140px] opacity-25"
          style={{ backgroundColor: theme.accentColor }}
        />

        {/* Sticky Floating Back Button */}
        <div className="fixed top-4 left-4 z-50 sm:top-5 sm:left-5">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/60 px-3.5 py-2 text-xs font-semibold text-white shadow-lg backdrop-blur-xl transition-all hover:border-white/40 hover:bg-white/10 active:scale-95"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back</span>
          </Link>
        </div>

        {/* Profile Body */}
        <main className="mx-auto max-w-5xl px-4 sm:px-6 py-8 sm:py-16">
          <div className="grid gap-8 sm:gap-12 lg:grid-cols-12 lg:items-center">
            {/* Photo Container */}
            <div className="lg:col-span-5 w-full max-w-[360px] mx-auto lg:max-w-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="group relative overflow-hidden rounded-3xl border p-2.5 shadow-[0_16px_40px_rgba(0,0,0,0.5)] backdrop-blur-2xl"
                style={{
                  borderColor: theme.borderColor,
                  backgroundColor: theme.cardBg,
                }}
              >
                {/* Glass sheen highlight */}
                <div className="pointer-events-none absolute -inset-px rounded-3xl bg-gradient-to-br from-white/15 via-transparent to-transparent opacity-70" />

                <div ref={photoRef} className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-white/10 shadow-inner">
                  <Image
                    src={imageSrc}
                    alt={member.name}
                    fill
                    priority
                    onError={() => setImageSrc(FALLBACK_PHOTO)}
                    sizes="(max-width: 768px) 90vw, 40vw"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </div>

                <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between z-10">
                  <span
                    className={`inline-block rounded-full border px-3 py-1 text-[11px] uppercase tracking-wider backdrop-blur-md ${theme.badgeStyle}`}
                  >
                    {theme.name}
                  </span>
                  <span className="flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 text-[11px] text-gray-300 backdrop-blur-md border border-white/10">
                    <UserCheck className="h-3.5 w-3.5 text-[#EB0028]" />
                    <span>TEDxGCEM 2026</span>
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Member Details */}
            <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="flex items-center justify-center lg:justify-start gap-2 mb-3">
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: theme.accentColor }} />
                  <span className="text-xs sm:text-sm font-semibold uppercase tracking-widest" style={{ color: theme.accentColor }}>
                    {member.role}
                  </span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white break-words">
                  {member.name}
                </h1>

                <p className="mt-4 sm:mt-6 text-lg sm:text-xl leading-relaxed text-gray-300 font-light border-l-0 lg:border-l-2 lg:pl-4" style={{ borderColor: theme.accentColor }}>
                  &ldquo;{member.oneLiner}&rdquo;
                </p>

                <div className="mt-6 sm:mt-8 flex justify-center lg:justify-start">
                  <SocialLinks
                    linkedin={member.linkedin}
                    instagram={member.instagram}
                    github={member.github}
                    portfolio={member.portfolio}
                    theme={theme}
                  />
                </div>
              </motion.div>
            </div>
          </div>

          <div ref={sectionsRef} className="mt-12 sm:mt-16 grid gap-6 sm:gap-8 grid-cols-1 lg:grid-cols-2">
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl border p-6 sm:p-8 backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]"
              style={{
                borderColor: theme.borderColor,
                backgroundColor: theme.cardBg,
              }}
            >
              <h2 className="flex items-center gap-3 text-lg sm:text-xl font-bold text-white mb-4">
                <span className="h-6 w-1 rounded-full" style={{ backgroundColor: theme.accentColor }} />
                About Me
              </h2>
              <p className="leading-relaxed text-gray-300 whitespace-pre-line text-sm sm:text-base font-normal break-words">
                {member.bio}
              </p>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="rounded-3xl border p-6 sm:p-8 backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]"
              style={{
                borderColor: theme.borderColor,
                backgroundColor: theme.cardBg,
              }}
            >
              <h2 className="flex items-center gap-3 text-lg sm:text-xl font-bold text-white mb-4">
                <span className="h-6 w-1 rounded-full bg-[#EB0028]" />
                My Role at TEDx
              </h2>
              <p className="leading-relaxed text-gray-300 whitespace-pre-line text-sm sm:text-base font-normal break-words">
                {member.contribution}
              </p>
            </motion.section>

            {parsedInterests.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="grid-cols-1 lg:col-span-2 rounded-3xl border p-6 sm:p-8 backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]"
                style={{
                  borderColor: theme.borderColor,
                  backgroundColor: theme.cardBg,
                }}
              >
                <h2 className="flex items-center gap-3 text-lg sm:text-xl font-bold text-white mb-4">
                  <Sparkles className="h-5 w-5" style={{ color: theme.accentColor }} />
                  Beyond TEDx
                </h2>
                <div className="flex flex-wrap gap-2.5">
                  {parsedInterests.map((interest, idx) => (
                    <span
                      key={idx}
                      className="rounded-full border px-3.5 py-1.5 text-xs sm:text-sm font-medium transition-transform hover:scale-105 backdrop-blur-md"
                      style={{
                        borderColor: theme.borderColor,
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        color: theme.textColor,
                      }}
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </motion.section>
            )}
          </div>
        </main>

        <footer className="mt-16 border-t border-white/10 bg-black/60 px-4 sm:px-6 py-8 backdrop-blur-xl text-center text-xs sm:text-sm text-gray-400">
          <div className="mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Image
                src="/tedxgcem.png"
                alt="TEDxGCEM Logo"
                width={133}
                height={38}
                className="h-[25px] w-auto object-contain opacity-80"
              />
              <span className="text-gray-500">— Ideas Worth Spreading</span>
            </div>

            <Link
              href="/"
              className="text-xs uppercase tracking-widest text-gray-400 hover:text-white transition-colors underline decoration-dotted underline-offset-4"
            >
              Explore Full Team Directory
            </Link>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}
