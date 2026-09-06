import { ExternalLink, Briefcase } from 'lucide-react';
import { workHistory } from '../data/portfolioData';

export default function WorkHistory() {
  return (
    <div className="flex flex-col">
      {/* Section Header */}
      <div className="pb-2.5 flex items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2">
          <Briefcase className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />
          <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
            Work Experience
          </span>
        </div>
        <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500">
          9+ yrs • 4 roles
        </span>
      </div>

      {/* Experience Entries */}
      <div className="flex flex-col gap-3">
        {workHistory.map((job) => (
          <div
            key={job.id}
            className="theme-card p-3.5 sm:p-4 rounded-lg border border-zinc-200/60 dark:border-zinc-800/50 bg-white/40 dark:bg-zinc-900/30 hover:border-zinc-300/80 dark:hover:border-zinc-700/80 transition-all duration-200 flex flex-col gap-2.5"
          >
            {/* Header: Company, Role & Period */}
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                {job.companyUrl ? (
                  <a
                    href={job.companyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="group/link inline-flex items-center gap-1 text-xs font-semibold text-zinc-900 dark:text-zinc-100 hover:text-black dark:hover:text-white"
                  >
                    <span>{job.company}</span>
                    <ExternalLink className="w-3 h-3 text-zinc-400 group-hover/link:text-zinc-800 dark:group-hover/link:text-zinc-200 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                  </a>
                ) : (
                  <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                    {job.company}
                  </span>
                )}

                <span className="text-zinc-300 dark:text-zinc-700 text-xs">•</span>

                <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                  {job.role}
                </span>

                {job.current && (
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Current
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
                  {job.period}
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {job.description}
            </p>

            {/* Sub-projects / Systems Built (pifa.studio tree branch style) */}
            {job.projects && job.projects.length > 0 && (
              <div className="pt-1 border-t border-zinc-100/80 dark:border-zinc-800/40 flex flex-col gap-1.5">
                <div className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500 flex items-center gap-1">
                  <span>Shipped systems & core modules</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5">
                  {job.projects.map((proj, idx) => (
                    <div
                      key={idx}
                      className="theme-pill px-2.5 py-1.5 rounded-md border border-zinc-200/50 dark:border-zinc-800/50 flex items-center justify-between text-[11px]"
                    >
                      {proj.url ? (
                        <a
                          href={proj.url}
                          target="_blank"
                          rel="noreferrer"
                          className="font-medium text-zinc-800 dark:text-zinc-200 hover:underline flex items-center gap-1 truncate"
                        >
                          <span className="truncate">{proj.name}</span>
                          <ExternalLink className="w-2.5 h-2.5 text-zinc-400 shrink-0" />
                        </a>
                      ) : (
                        <span className="font-medium text-zinc-700 dark:text-zinc-300 truncate">
                          {proj.name}
                        </span>
                      )}
                      <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 shrink-0 ml-1">
                        {proj.type}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Technologies Pills */}
            <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
              <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 mr-1">
                Stack:
              </span>
              {job.technologies.map((tech) => (
                <span
                  key={tech}
                  className="theme-pill px-1.5 py-0.5 rounded text-[10px] font-mono text-zinc-600 dark:text-zinc-400 border border-zinc-200/60 dark:border-zinc-800/50"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
