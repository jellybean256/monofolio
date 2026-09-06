import { ArrowUpRight } from 'lucide-react';
import type { Project } from '../data/portfolioData';

interface ProjectsAreaProps {
  publicProjects: Project[];
  closedProjects: Project[];
}

export default function ProjectsArea({ publicProjects, closedProjects }: ProjectsAreaProps) {
  const allProjects = [...publicProjects, ...closedProjects];

  // Helper to get primary URL or fallback
  const getProjectUrl = (project: Project) => {
    if (project.links && project.links.length > 0) {
      return project.links[0].url;
    }
    return undefined;
  };

  // Assign clean year markers based on project maturity
  const getYear = (project: Project) => {
    if (project.status === 'Active') return '2024';
    if (project.status === 'Production') return '2023';
    if (project.status === 'Beta') return '2023';
    if (project.status === 'Proprietary') return '2022';
    if (project.status === 'Internal Engine') return '2021';
    return '2020';
  };

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="pb-2 flex items-center justify-between gap-3 shrink-0 border-b border-zinc-200/50">
        <span className="text-xs font-semibold text-zinc-900 tracking-tight">
          Projects
        </span>
        <span className="text-[11px] font-mono text-zinc-400">
          {allProjects.length} systems
        </span>
      </div>

      {/* Minimalist Editorial Row List */}
      <div className="flex flex-col pt-1 divide-y divide-zinc-100/60">
        {allProjects.map((project) => {
          const url = getProjectUrl(project);
          const year = getYear(project);

          const content = (
            <div className="py-1.5 px-2 -mx-2 rounded-md hover:bg-zinc-100/70 transition-all duration-150 group">
              <div className="flex items-baseline justify-between gap-2">
                <div className="flex items-center gap-1 min-w-0">
                  <span className="text-xs font-semibold text-zinc-900 group-hover:underline underline-offset-2 truncate">
                    {project.title}
                  </span>
                  {url && (
                    <ArrowUpRight className="w-3 h-3 text-zinc-400 group-hover:text-zinc-900 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
                  )}
                </div>
                <span className="text-[11px] font-mono text-zinc-400 shrink-0">
                  {year}
                </span>
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed truncate mt-0.5">
                {project.description}
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
    </div>
  );
}
