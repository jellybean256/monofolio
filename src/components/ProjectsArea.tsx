import React, { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import type { Project } from '../data/portfolioData';

interface ProjectsAreaProps {
  publicProjects: Project[];
  closedProjects: Project[];
}

export default function ProjectsArea({ publicProjects, closedProjects }: ProjectsAreaProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'public' | 'closed'>('all');

  const allProjects = [...publicProjects, ...closedProjects];

  const filteredProjects = allProjects.filter((project) => {
    if (activeTab === 'public' && project.category !== 'public') return false;
    if (activeTab === 'closed' && project.category !== 'closed') return false;
    return true;
  });

  return (
    <div className="flex flex-col overflow-visible lg:overflow-hidden h-auto lg:h-fit lg:max-h-[296px] shrink-0">
      {/* Header: Clean quiet tabs (no search input) */}
      <div className="pb-2.5 flex items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
            Projects
          </span>
          <div className="flex items-center gap-1 text-xs">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`px-2 py-0.5 rounded-md transition-colors cursor-pointer ${
                activeTab === 'all'
                  ? 'font-medium text-zinc-900 dark:text-zinc-100 bg-zinc-100 dark:bg-zinc-800'
                  : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200'
              }`}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('public')}
              className={`px-2 py-0.5 rounded-md transition-colors cursor-pointer ${
                activeTab === 'public'
                  ? 'font-medium text-zinc-900 dark:text-zinc-100 bg-zinc-100 dark:bg-zinc-800'
                  : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200'
              }`}
            >
              Public
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('closed')}
              className={`px-2 py-0.5 rounded-md transition-colors cursor-pointer ${
                activeTab === 'closed'
                  ? 'font-medium text-zinc-900 dark:text-zinc-100 bg-zinc-100 dark:bg-zinc-800'
                  : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200'
              }`}
            >
              Private
            </button>
          </div>
        </div>
      </div>

      {/* Projects Grid Container: Scrolls internally on desktop, expands naturally on mobile */}
      <div className="flex-1 min-h-0 overflow-visible lg:overflow-y-auto custom-scrollbar lg:pr-1.5 pb-1">
        {filteredProjects.length === 0 ? (
          <div className="h-full flex items-center justify-center text-xs text-zinc-400 py-6">
            No matching projects
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {filteredProjects.map((project) => {
              const isClosed = project.category === 'closed';

              return (
                <div
                  key={project.id}
                  className="flex flex-col justify-between p-3 rounded-lg border border-zinc-200/50 dark:border-zinc-800/50 bg-white/40 dark:bg-zinc-900/30 hover:border-zinc-300/80 dark:hover:border-zinc-700/80 transition-colors"
                >
                  <div>
                    {/* Title */}
                    <h2 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight truncate mb-1.5">
                      {project.title}
                    </h2>

                    {/* Description */}
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-3 mb-3">
                      {project.description}
                    </p>
                  </div>

                  {/* Links Row */}
                  <div className="flex items-center gap-3 pt-2 border-t border-zinc-100 dark:border-zinc-800/40 text-[11px] font-mono">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors cursor-pointer"
                      >
                        <span>Live Demo</span>
                        <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                      </a>
                    )}
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors cursor-pointer"
                      >
                        <span>Repository</span>
                        <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                      </a>
                    )}
                    {project.caseStudyUrl && (
                      <a
                        href={project.caseStudyUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors cursor-pointer"
                      >
                        <span>Overview</span>
                        <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                      </a>
                    )}
                    {isClosed && (
                      <span className="text-zinc-400 dark:text-zinc-600 italic text-[11px]">
                        Closed-source enterprise platform
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
