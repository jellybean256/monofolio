import type { DeveloperProfile, SocialLink } from '../../../data/portfolioData';
import { Check } from 'lucide-react';

interface ProfileEditorProps {
  profile: DeveloperProfile;
  socials: SocialLink[];
  onUpdateProfile: (updated: Partial<DeveloperProfile>) => void;
  onUpdateSocials: (updated: SocialLink[]) => void;
}

const AVATAR_OPTIONS = [
  {
    id: 'builder_a',
    name: 'Builder A',
    subtitle: 'Classic',
    url: '/avatar.png',
  },
  {
    id: 'builder_b',
    name: 'Builder B',
    subtitle: 'Bun & Glasses',
    url: '/avatar_girl.png',
  },
];

export default function ProfileEditor({
  profile,
  socials,
  onUpdateProfile,
  onUpdateSocials,
}: ProfileEditorProps) {
  const handleSocialChange = (id: string, url: string) => {
    const updated = socials.map((item) => (item.id === id ? { ...item, url } : item));
    onUpdateSocials(updated);
  };

  const getSocialUrl = (id: string) => socials.find((s) => s.id === id)?.url || '';

  return (
    <div className="space-y-6">
      {/* Avatar Template Selector */}
      <div className="space-y-2.5">
        <label className="block text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
          Signature Avatar Template
        </label>
        <div className="grid grid-cols-2 gap-3">
          {AVATAR_OPTIONS.map((opt) => {
            const isSelected = profile.avatarUrl === opt.url;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => onUpdateProfile({ avatarUrl: opt.url })}
                className={`flex items-center gap-3 p-2.5 rounded-xl border transition-all text-left cursor-pointer ${
                  isSelected
                    ? 'border-zinc-900 bg-zinc-900/5 shadow-2xs ring-1 ring-zinc-900/10'
                    : 'border-zinc-200 bg-white hover:border-zinc-300 hover:bg-zinc-50/50'
                }`}
              >
                <div className="relative w-11 h-11 rounded-full overflow-hidden border border-zinc-200 bg-zinc-100/80 shrink-0">
                  <img
                    src={opt.url}
                    alt={opt.name}
                    className="w-full h-full object-cover"
                  />
                  {isSelected && (
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <Check className="w-4 h-4 text-white stroke-[2.5]" />
                    </div>
                  )}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-semibold text-zinc-900 truncate">
                    {opt.name}
                  </span>
                  <span className="text-[11px] font-mono text-zinc-500 truncate">
                    {opt.subtitle}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
        <p className="text-[11px] font-mono text-zinc-400">
          Universal illustrated templates styled specifically for mono.folio.
        </p>
      </div>

      <hr className="border-zinc-100" />

      {/* Identity Fields */}
      <div className="space-y-4">
        <div>
          <label className="block text-[11px] font-mono text-zinc-500 uppercase tracking-wider mb-1.5">
            Full Name
          </label>
          <input
            type="text"
            value={profile.name}
            onChange={(e) => onUpdateProfile({ name: e.target.value })}
            placeholder="e.g. Julian Vance"
            className="w-full px-3 py-2 text-xs font-medium text-zinc-900 bg-white border border-zinc-200 rounded-lg outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900/10 transition-all"
          />
        </div>

        <div>
          <label className="block text-[11px] font-mono text-zinc-500 uppercase tracking-wider mb-1.5">
            Professional Role / Headline
          </label>
          <input
            type="text"
            value={profile.role}
            onChange={(e) => onUpdateProfile({ role: e.target.value })}
            placeholder="e.g. Staff Systems & Full-Stack Engineer"
            className="w-full px-3 py-2 text-xs text-zinc-900 bg-white border border-zinc-200 rounded-lg outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900/10 transition-all font-mono"
          />
        </div>

        <div>
          <label className="block text-[11px] font-mono text-zinc-500 uppercase tracking-wider mb-1.5">
            Location
          </label>
          <input
            type="text"
            value={profile.location}
            onChange={(e) => onUpdateProfile({ location: e.target.value })}
            placeholder="e.g. San Francisco, CA"
            className="w-full px-3 py-2 text-xs text-zinc-900 bg-white border border-zinc-200 rounded-lg outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900/10 transition-all"
          />
        </div>

        <div>
          <label className="block text-[11px] font-mono text-zinc-500 uppercase tracking-wider mb-1.5">
            Bio / Mission Statement
          </label>
          <textarea
            value={profile.bio}
            onChange={(e) => onUpdateProfile({ bio: e.target.value })}
            placeholder="A concise 2-3 sentence overview of what you build and what you care about."
            rows={3}
            className="w-full px-3 py-2 text-xs text-zinc-900 bg-white border border-zinc-200 rounded-lg outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900/10 transition-all resize-y leading-relaxed font-mono"
          />
        </div>
      </div>

      <hr className="border-zinc-100" />

      {/* Social Links */}
      <div className="space-y-3">
        <label className="block text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
          Social Links & Presence
        </label>
        <div className="space-y-2.5">
          <div>
            <label className="block text-[10px] font-mono text-zinc-400 mb-1">
              GitHub URL
            </label>
            <input
              type="url"
              value={getSocialUrl('github')}
              onChange={(e) => handleSocialChange('github', e.target.value)}
              placeholder="https://github.com/username"
              className="w-full px-3 py-1.5 text-xs text-zinc-900 bg-white border border-zinc-200 rounded-lg outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900/10 font-mono transition-all"
            />
          </div>

          <div>
            <label className="block text-[10px] font-mono text-zinc-400 mb-1">
              LinkedIn URL
            </label>
            <input
              type="url"
              value={getSocialUrl('linkedin')}
              onChange={(e) => handleSocialChange('linkedin', e.target.value)}
              placeholder="https://linkedin.com/in/username"
              className="w-full px-3 py-1.5 text-xs text-zinc-900 bg-white border border-zinc-200 rounded-lg outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900/10 font-mono transition-all"
            />
          </div>

          <div>
            <label className="block text-[10px] font-mono text-zinc-400 mb-1">
              X / Twitter URL
            </label>
            <input
              type="url"
              value={getSocialUrl('twitter')}
              onChange={(e) => handleSocialChange('twitter', e.target.value)}
              placeholder="https://x.com/username"
              className="w-full px-3 py-1.5 text-xs text-zinc-900 bg-white border border-zinc-200 rounded-lg outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900/10 font-mono transition-all"
            />
          </div>

          <div>
            <label className="block text-[10px] font-mono text-zinc-400 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={getSocialUrl('mail').replace('mailto:', '')}
              onChange={(e) =>
                handleSocialChange(
                  'mail',
                  e.target.value ? `mailto:${e.target.value}` : ''
                )
              }
              placeholder="you@domain.com"
              className="w-full px-3 py-1.5 text-xs text-zinc-900 bg-white border border-zinc-200 rounded-lg outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900/10 font-mono transition-all"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
