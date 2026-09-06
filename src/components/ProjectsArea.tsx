import { useState } from 'react';
import { ArrowUpRight, ChevronDown, ChevronUp } from 'lucide-react';
import type { Project } from '../data/portfolioData';

interface ProjectsAreaProps {
  publicProjects: Project[];
  closedProjects: Project[];
}

const projectMeta: Record<string, { shortTitle?: string; tagline: string; year: string }> = {
  'vortex-kv': { shortTitle: 'Vortex KV', tagline: 'Distributed key-value engine', year: '2024' },
  'hypertrace-agent': { shortTitle: 'HyperTrace APM', tagline: 'Kernel probe telemetry agent', year: '2023' },
  'lattice-engine': { shortTitle: 'Lattice UI Kit', tagline: 'Headless component engine', year: '2023' },
  'aegis-settlement': { shortTitle: 'Aegis Settlement', tagline: 'Financial ledger engine', year: '2022' },
  'sentinel-telemetry-grid': { shortTitle: 'Sentinel Mesh', tagline: 'Edge vehicle telemetry', year: '2021' },
  'chronos-queue': { shortTitle: 'Chronos Queue', tagline: 'Delayed job scheduler', year: '2021' },
  'strata-storage': { shortTitle: 'Strata Storage', tagline: 'Columnar cold-storage format', year: '2020' },
  'prism-proxy': { shortTitle: 'Prism Proxy', tagline: 'Low-latency mesh gateway', year: '2020' },
  'nexus-rpc': { shortTitle: 'Nexus RPC', tagline: 'Zero-copy serialization protocol', year: '2019' },
  'orion-inference-router': { shortTitle: 'Orion Gateway', tagline: 'GPU inference load distributor', year: '2019' },
};

export default function ProjectsArea({ publicProjects, closedProjects }: ProjectsAreaProps) {
  const [expanded, setExpanded] = useState(false);

  const allProjects = [...publicProjects, ...closedProjects];
  const displayedProjects = expanded ? allProjects : allProjects.slice(0, 5);

  // Helper to get primary URL or fallback
  const getProjectUrl = (project: Project) => {
    if (project.links && project.links.length > 0) {
      return project.links[0].url;
    }
    return undefined;
  };

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
          const url = getProjectUrl(project);
          const meta = projectMeta[project.id] || {
            shortTitle: project.title,
            tagline: project.description.split('.')[0] || project.description,
            year: '2023',
          };

          const displayTitle = meta.shortTitle || project.title;
          const { tagline, year } = meta;

          const content = (
            <div className="py-1.5 px-2 -mx-2 rounded hover:bg-zinc-100/70 transition-colors group">
              <div className="flex items-center justify-between gap-3">
                {/* Column 1: Project Title + External Arrow */}
                <div className="w-auto sm:w-48 shrink-0 flex items-center gap-1 min-w-0">
                  <span className="text-xs font-medium text-zinc-900 group-hover:text-zinc-950 group-hover:underline underline-offset-2 truncate">
                    {displayTitle}
                  </span>
                  {url && (
                    <ArrowUpRight className="w-3 h-3 text-zinc-400 group-hover:text-zinc-900 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
                  )}
                </div>

                {/* Column 2: Concise Tagline (shown in-line on desktop) */}
                <span className="hidden sm:block flex-1 min-w-0 text-[11.5px] text-zinc-500 group-hover:text-zinc-700 truncate">
                  {tagline}
                </span>

                {/* Column 3: Year */}
                <span className="text-[11px] font-mono text-zinc-400 shrink-0 text-right">
                  {year}
                </span>
              </div>

              {/* Tagline on Mobile: stacks cleanly below title */}
              <p className="sm:hidden text-[11.5px] text-zinc-500 truncate mt-0.5">
                {tagline}
              </p>
            </div>
          );

          return url ? (
            <a
              key={project.id}
              href={url}
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
      {allProjects.length > 5 && (
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
              <span>+ {allProjects.length - 5} more projects</span>
              <ChevronDown className="w-3 h-3" />
            </>
          )}
        </button>
      )}
    </div>
  );
}
