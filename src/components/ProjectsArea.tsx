import React, { useState } from 'react';
import { Search, ExternalLink } from 'lucide-react';
import type { Project } from '../data/portfolioData';

interface ProjectsAreaProps {
  publicProjects: Project[];
  closedProjects: Project[];
}

export default function ProjectsArea({ publicProjects, closedProjects }: ProjectsAreaProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'public' | 'closed'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const allProjects = [...publicProjects, ...closedProjects];

  const filteredProjects = allProjects.filter((project) => {
    if (activeTab === 'public' && project.category !== 'public') return false;
    if (activeTab === 'closed' && project.category !== 'closed') return false;

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchTitle = project.title.toLowerCase().includes(q);
      const matchDesc = project.description.toLowerCase().includes(q);
      return matchTitle || matchDesc;
    }

    return true;
  });

  return (
    <div className="flex flex-col bg-white/80 dark:bg-zinc-900/60 rounded-xl border border-zinc-200/60 dark:border-zinc-800/60 overflow-hidden h-fit max-h-[322px] shrink-0">
      {/* Header: Clean quiet tabs & minimal search */}
      <div className="px-3.5 py-2.5 border-b border-zinc-100 dark:border-zinc-800/60 flex items-center justify-between gap-3 shrink-0">
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

        {/* Minimal Search */}
        <div className="relative">
          <Search className="w-3 h-3 absolute left-2 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects..."
            aria-label="Filter projects"
            className="w-28 sm:w-36 text-xs pl-6 pr-2 py-0.5 rounded-md bg-transparent border border-zinc-200/80 dark:border-zinc-700/80 text-zinc-800 dark:text-zinc-200 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-500 transition-colors"
          />
        </div>
      </div>

      {/* Projects Grid Container: fills vertical space and scrolls internally if content overflows */}
      <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar p-3">
        {filteredProjects.length === 0 ? (
          <div className="h-full flex items-center justify-center text-xs text-zinc-400">
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

                    {/* Description as primary focus */}
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  {/* Links Row */}
                  <div className="pt-2.5 mt-2.5 border-t border-zinc-100 dark:border-zinc-800/40 flex items-center justify-between text-xs">
                    {isClosed ? (
                      <span className="text-[11px] text-zinc-400 dark:text-zinc-500 italic">
                        Closed-source enterprise platform
                      </span>
                    ) : (
                      <div className="flex items-center gap-3">
                        {project.links?.map((link) => (
                          <a
                            key={link.label}
                            href={link.url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-0.5 text-xs text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                          >
                            <span>{link.label}</span>
                            <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                          </a>
                        ))}
                      </div>
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
