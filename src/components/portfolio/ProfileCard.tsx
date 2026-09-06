import type { DeveloperProfile, SocialLink } from '../../data/portfolioData';

interface ProfileCardProps {
  profile: DeveloperProfile;
  socials: SocialLink[];
}

export default function ProfileCard({ profile, socials }: ProfileCardProps) {
  return (
    <div className="flex flex-col text-left p-0">
      {/* Large Circular Avatar */}
      <img
        src={profile.avatarUrl || '/avatar.png'}
        alt={`Profile portrait of ${profile.name}`}
        className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover ring-2 ring-zinc-200/90 shadow-xs shrink-0 bg-zinc-100/80 m-0.5"
        loading="eager"
        onError={(e) => {
          // Fallback if image fails to load
          (e.target as HTMLElement).style.display = 'none';
        }}
      />

      {/* Name (Left-aligned, prominent) */}
      <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight leading-tight mt-4 break-words [overflow-wrap:anywhere]">
        {profile.name}
      </h1>

      {/* Role */}
      <p className="text-xs sm:text-sm font-mono text-zinc-600 mt-1 break-words [overflow-wrap:anywhere]">
        {profile.role}
      </p>

      {/* Location with Pin Icon */}
      {profile.location && (
        <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-500 mt-1.5 min-w-0">
          <svg className="w-3.5 h-3.5 text-zinc-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="truncate">{profile.location}</span>
        </div>
      )}

      {/* Bio (Left-aligned monospace) */}
      {profile.bio && (
        <p className="text-xs sm:text-sm font-mono text-zinc-700 leading-relaxed mt-4 whitespace-pre-line break-words [overflow-wrap:anywhere]">
          {profile.bio}
        </p>
      )}

      {/* Social Links */}
      {socials && socials.length > 0 && (
        <div className="flex items-center gap-3.5 mt-4">
          {socials.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              aria-label={link.ariaLabel || link.name}
              title={link.name}
              className="text-zinc-400 hover:text-zinc-900 transition-colors"
            >
              {link.icon === 'github' && (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              )}
              {link.icon === 'linkedin' && (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              )}
              {link.icon === 'twitter' && (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              )}
              {link.icon === 'mail' && (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              )}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
