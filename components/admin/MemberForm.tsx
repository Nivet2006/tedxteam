'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Save, ArrowLeft, Loader2, Sparkles, Download } from 'lucide-react';
import { teamThemes, TeamGroup } from '@/lib/themes';

interface InitialMemberData {
  id?: string;
  slug?: string;
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
}

export function MemberForm({ initialData }: { initialData?: InitialMemberData }) {
  const router = useRouter();
  const isEdit = Boolean(initialData?.id);

  let parsedInterestsString = '';
  try {
    if (initialData?.interests) {
      const arr = JSON.parse(initialData.interests);
      if (Array.isArray(arr)) {
        parsedInterestsString = arr.join(', ');
      }
    }
  } catch {
    parsedInterestsString = '';
  }

  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    role: initialData?.role || '',
    team: (initialData?.team || 'technology') as TeamGroup,
    oneLiner: initialData?.oneLiner || '',
    bio: initialData?.bio || '',
    contribution: initialData?.contribution || '',
    interestsInput: parsedInterestsString,
    photoUrl: initialData?.photoUrl || '/members/placeholder.png',
    linkedin: initialData?.linkedin || '',
    instagram: initialData?.instagram || '',
    github: initialData?.github || '',
    portfolio: initialData?.portfolio || '',
  });

  const [previewError, setPreviewError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const interestsArr = formData.interestsInput
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const payload = {
      ...formData,
      interests: interestsArr,
    };

    try {
      const url = isEdit ? `/api/members/${initialData?.id}` : '/api/members';
      const method = isEdit ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        router.push('/admin');
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to save member details');
      }
    } catch (err) {
      console.error(err);
      setError('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const teamKeys = Object.keys(teamThemes) as TeamGroup[];
  const previewSrc = previewError ? '/members/placeholder.png' : formData.photoUrl || '/members/placeholder.png';

  return (
    <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8 max-w-4xl mx-auto w-full">
      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Header Actions */}
      <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Cancel</span>
        </button>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {isEdit && initialData?.slug && (
            <a
              href={`/api/qr/${initialData.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-red-500/30 bg-red-950/30 px-4 py-2.5 text-sm font-medium text-red-400 hover:bg-red-900/50 transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>Download Badge QR</span>
            </a>
          )}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#EB0028] px-6 py-2.5 text-sm font-semibold text-white hover:bg-red-700 transition-colors disabled:opacity-50"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            <span>{isEdit ? 'Save Changes' : 'Create Profile'}</span>
          </button>
        </div>
      </div>

      {/* Main Form Fields */}
      <div className="grid gap-6 sm:gap-8 grid-cols-1 lg:grid-cols-12 w-full">
        {/* Left: Photo Preview */}
        <div className="lg:col-span-4 space-y-4">
          <label className="block text-sm font-medium text-gray-300">Profile Photo Preview</label>
          <div className="relative aspect-[4/5] w-full max-w-[320px] mx-auto lg:max-w-none overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-xl">
            <Image
              src={previewSrc}
              alt="Photo preview"
              fill
              onError={() => setPreviewError(true)}
              className="object-cover"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1">
              Photo URL / Local Asset Path
            </label>
            <input
              type="text"
              required
              value={formData.photoUrl}
              onChange={(e) => {
                setPreviewError(false);
                setFormData({ ...formData, photoUrl: e.target.value });
              }}
              placeholder="e.g. /members/placeholder.png"
              className="w-full min-h-[44px] rounded-xl border border-white/10 bg-slate-900 px-3.5 py-2.5 text-xs text-white focus:border-red-500 focus:outline-none"
            />
            <p className="mt-1 text-[11px] text-gray-500">
              Use local asset paths (e.g. /members/placeholder.png) or valid image URLs
            </p>
          </div>
        </div>

        {/* Right: Input Controls */}
        <div className="lg:col-span-8 space-y-5 sm:space-y-6">
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Bharath M"
                className="w-full min-h-[44px] rounded-xl border border-white/10 bg-slate-900 px-4 py-2.5 text-sm text-white focus:border-red-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Actual Role Designation
              </label>
              <input
                type="text"
                required
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                placeholder="e.g. Executive Producer, Technical Lead"
                className="w-full min-h-[44px] rounded-xl border border-white/10 bg-slate-900 px-4 py-2.5 text-sm text-white focus:border-red-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Team Group (Drives Visual Theme)
            </label>
            <select
              value={formData.team}
              onChange={(e) => setFormData({ ...formData, team: e.target.value as TeamGroup })}
              className="w-full min-h-[44px] rounded-xl border border-white/10 bg-slate-900 px-4 py-2.5 text-sm text-white focus:border-red-500 focus:outline-none"
            >
              {teamKeys.map((t) => (
                <option key={t} value={t}>
                  {teamThemes[t].name} ({teamThemes[t].motionCharacter})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">One-Liner Hook</label>
            <input
              type="text"
              required
              value={formData.oneLiner}
              onChange={(e) => setFormData({ ...formData, oneLiner: e.target.value })}
              placeholder="Short headline quote..."
              className="w-full min-h-[44px] rounded-xl border border-white/10 bg-slate-900 px-4 py-2.5 text-sm text-white focus:border-red-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Bio (About Me)</label>
            <textarea
              required
              rows={4}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              placeholder="Detailed background..."
              className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-2.5 text-sm text-white focus:border-red-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              My Role at TEDx (Contribution)
            </label>
            <textarea
              required
              rows={3}
              value={formData.contribution}
              onChange={(e) => setFormData({ ...formData, contribution: e.target.value })}
              placeholder="What this member specifically leads for TEDxGCEM..."
              className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-2.5 text-sm text-white focus:border-red-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-400" />
              Beyond TEDx (Interests, comma-separated)
            </label>
            <input
              type="text"
              value={formData.interestsInput}
              onChange={(e) => setFormData({ ...formData, interestsInput: e.target.value })}
              placeholder="e.g. Strategic Vision, Lighting Engineering, Full-Stack Development"
              className="w-full min-h-[44px] rounded-xl border border-white/10 bg-slate-900 px-4 py-2.5 text-sm text-white focus:border-red-500 focus:outline-none"
            />
          </div>

          {/* Social Links */}
          <div className="border-t border-white/10 pt-6 space-y-4">
            <h4 className="text-sm font-semibold text-gray-200">Social Handles & Links (Optional)</h4>

            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
              <div>
                <label className="block text-xs text-gray-400 mb-1">LinkedIn URL</label>
                <input
                  type="url"
                  value={formData.linkedin}
                  onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                  placeholder="https://linkedin.com/in/username"
                  className="w-full min-h-[44px] rounded-xl border border-white/10 bg-slate-900 px-3.5 py-2.5 text-xs text-white focus:border-red-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1">Instagram URL</label>
                <input
                  type="url"
                  value={formData.instagram}
                  onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                  placeholder="https://instagram.com/username"
                  className="w-full min-h-[44px] rounded-xl border border-white/10 bg-slate-900 px-3.5 py-2.5 text-xs text-white focus:border-red-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1">GitHub URL</label>
                <input
                  type="url"
                  value={formData.github}
                  onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                  placeholder="https://github.com/username"
                  className="w-full min-h-[44px] rounded-xl border border-white/10 bg-slate-900 px-3.5 py-2.5 text-xs text-white focus:border-red-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1">Portfolio URL</label>
                <input
                  type="url"
                  value={formData.portfolio}
                  onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                  placeholder="https://yourwebsite.com"
                  className="w-full min-h-[44px] rounded-xl border border-white/10 bg-slate-900 px-3.5 py-2.5 text-xs text-white focus:border-red-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
