import { useState } from 'react';
import { ArrowUpRight, ChevronDown, ChevronUp } from 'lucide-react';
import type { ProjectItem } from '../../data/portfolioData';

interface ProjectsAreaProps {
  projects: ProjectItem[];
}

export default function ProjectsArea({ projects }: ProjectsAreaProps) {
  const [expanded, setExpanded] = useState(false);

  if (!projects || projects.length === 0) return null;

  const displayedProjects = expanded ? projects : projects.slice(0, 5);

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="pb-1.5 flex items-center justify-between gap-3 shrink-0 border-b border-zinc-200/50">
        <span className="text-xs font-semibold text-zinc-900 tracking-tight">
          Projects
        </span>
      </div>

      {/* Single-Line Tabular / Index Row List */}
      <div className="flex flex-col pt-1 divide-y divide-zinc-100/50">
        {displayedProjects.map((project) => {
          const content = (
            <div className="py-1.5 px-2 -mx-2 rounded hover:bg-zinc-100/70 transition-colors group">
              <div className="flex items-center justify-between gap-3">
                {/* Column 1: Project Title + External Arrow */}
                <div className="w-auto sm:w-48 shrink-0 flex items-center gap-1 min-w-0">
                  <span className="text-xs font-medium text-zinc-900 group-hover:text-zinc-950 group-hover:underline underline-offset-2 truncate">
                    {project.title}
                  </span>
                  {project.url && (
                    <ArrowUpRight className="w-3 h-3 text-zinc-400 group-hover:text-zinc-900 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
                  )}
                </div>

                {/* Column 2: Concise Tagline (shown in-line on desktop) */}
                <span className="hidden sm:block flex-1 min-w-0 text-[11.5px] text-zinc-500 group-hover:text-zinc-700 truncate">
                  {project.tagline}
                </span>

                {/* Column 3: Year */}
                <span className="text-[11px] font-mono text-zinc-400 shrink-0 text-right">
                  {project.year}
                </span>
              </div>

              {/* Tagline on Mobile: stacks cleanly below title */}
              {project.tagline && (
                <p className="sm:hidden text-[11.5px] text-zinc-500 truncate mt-0.5">
                  {project.tagline}
                </p>
              )}
            </div>
          );

          return project.url ? (
            <a
              key={project.id}
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="block no-underline"
            >
              {content}
            </a>
          ) : (
            <div key={project.id} className="block">
              {content}
            </div>
          );
        })}
      </div>

      {/* Solution C Inline Toggle Action */}
      {projects.length > 5 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="self-start mt-1 text-[11px] font-mono text-zinc-400 hover:text-zinc-900 transition-colors flex items-center gap-1 cursor-pointer pt-0.5"
        >
          {expanded ? (
            <>
              <span>- show fewer</span>
              <ChevronUp className="w-3 h-3" />
            </>
          ) : (
            <>
              <span>+ {projects.length - 5} more projects</span>
              <ChevronDown className="w-3 h-3" />
            </>
          )}
        </button>
      )}
    </div>
  );
}
