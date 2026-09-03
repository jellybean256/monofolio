import React, { useState } from 'react';
import { 
  Globe, 
  Lock, 
  ExternalLink, 
  FileText, 
  ShieldAlert, 
  Layers, 
  Sparkles,
  Search
} from 'lucide-react';
import { GithubIcon } from './Icons';
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
    // Tab filter
    if (activeTab === 'public' && project.category !== 'public') return false;
    if (activeTab === 'closed' && project.category !== 'closed') return false;

    // Search query filter
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchTitle = project.title.toLowerCase().includes(q);
      const matchDesc = project.description.toLowerCase().includes(q);
      const matchTech = project.technologies.some((t) => t.toLowerCase().includes(q));
      return matchTitle || matchDesc || matchTech;
    }

    return true;
  });

  return (
    <div className="flex-1 min-h-0 flex flex-col bg-white dark:bg-zinc-900/90 rounded-xl border border-slate-200/90 dark:border-zinc-800/80 shadow-2xs overflow-hidden">
      {/* Header bar: Tabs & Count & Filter */}
      <div className="px-3.5 py-2.5 border-b border-slate-100 dark:border-zinc-800/70 flex flex-wrap items-center justify-between gap-2 shrink-0 bg-slate-50/50 dark:bg-zinc-900/50">
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-1 p-0.5 rounded-lg bg-slate-200/70 dark:bg-zinc-800/80 text-xs">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`px-2.5 py-1 rounded-md font-medium transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-white dark:bg-zinc-700 text-slate-900 dark:text-zinc-100 shadow-2xs'
                  : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200'
              }`}
            >
              All <span className="opacity-60 text-2xs">({allProjects.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('public')}
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md font-medium transition-all cursor-pointer ${
                activeTab === 'public'
                  ? 'bg-white dark:bg-zinc-700 text-slate-900 dark:text-zinc-100 shadow-2xs'
                  : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200'
              }`}
            >
              <Globe className="w-3 h-3 text-emerald-500" />
              <span>Public</span>
              <span className="opacity-60 text-2xs">({publicProjects.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('closed')}
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md font-medium transition-all cursor-pointer ${
                activeTab === 'closed'
                  ? 'bg-white dark:bg-zinc-700 text-slate-900 dark:text-zinc-100 shadow-2xs'
                  : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200'
              }`}
            >
              <Lock className="w-3 h-3 text-amber-500" />
              <span>Closed / Private</span>
              <span className="opacity-60 text-2xs">({closedProjects.length})</span>
            </button>
          </div>
        </div>

        {/* Quick Search */}
        <div className="relative">
          <Search className="w-3 h-3 absolute left-2 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-500 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter tech or name..."
            aria-label="Filter projects"
            className="w-36 sm:w-44 text-xs pl-6 pr-2 py-1 rounded-md bg-white dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700/80 text-slate-800 dark:text-zinc-200 placeholder:text-slate-400 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 text-2xs text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Projects Cards Container - internal custom scrollbar prevents single-screen page scroll */}
      <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar p-3 sm:p-3.5 space-y-2.5">
        {filteredProjects.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400 dark:text-zinc-500">
            <Layers className="w-8 h-8 stroke-[1.5] mb-2 opacity-50" />
            <p className="text-xs font-medium">No projects match the current filter</p>
            <button
              onClick={() => {
                setActiveTab('all');
                setSearchQuery('');
              }}
              className="mt-2 text-2xs text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {filteredProjects.map((project) => {
              const isClosed = project.category === 'closed';

              return (
                <div
                  key={project.id}
                  className={`flex flex-col justify-between p-3 rounded-lg border transition-all ${
                    isClosed
                      ? 'border-amber-200/60 dark:border-amber-900/30 bg-amber-500/[0.015] dark:bg-amber-950/[0.08] hover:border-amber-300 dark:hover:border-amber-800/50'
                      : 'border-slate-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 hover:border-slate-300 dark:hover:border-zinc-700'
                  }`}
                >
                  <div>
                    {/* Top Row: Title + Badges */}
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <h3 className="text-xs font-semibold text-slate-900 dark:text-zinc-100 tracking-tight truncate">
                            {project.title}
                          </h3>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        {/* Status Badge */}
                        <span
                          className={`text-3xs font-medium px-1.5 py-0.5 rounded-full border ${
                            project.status === 'Production' || project.status === 'Live'
                              ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/60'
                              : project.status === 'Proprietary' || project.status === 'Internal Engine'
                              ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800/60'
                              : 'bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 border-slate-200 dark:border-zinc-700'
                          }`}
                        >
                          {project.status}
                        </span>

                        {/* Public / Private Badge */}
                        {isClosed ? (
                          <span
                            title="Closed source / Proprietary enterprise project"
                            className="inline-flex items-center gap-0.5 text-3xs font-medium px-1.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700"
                          >
                            <Lock className="w-2.5 h-2.5 text-amber-500" />
                            <span>Private</span>
                          </span>
                        ) : (
                          <span
                            title="Public / Open source"
                            className="inline-flex items-center gap-0.5 text-3xs font-medium px-1.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/50"
                          >
                            <Globe className="w-2.5 h-2.5 text-emerald-500" />
                            <span>Public</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-2xs text-slate-600 dark:text-zinc-400 leading-relaxed line-clamp-2 mb-2">
                      {project.description}
                    </p>

                    {/* Key metric / highlight */}
                    {project.highlightMetric && (
                      <div className="mb-2 inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-100/80 dark:bg-zinc-800/60 text-3xs font-mono text-slate-700 dark:text-zinc-300">
                        <Sparkles className="w-2.5 h-2.5 text-emerald-500 shrink-0" />
                        <span className="truncate">{project.highlightMetric}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    {/* Technologies tags */}
                    <div className="flex flex-wrap gap-1 mb-2.5">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-1.5 py-0.5 text-3xs rounded font-mono bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 border border-slate-200/60 dark:border-zinc-700/60"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Bottom: Links or Closed notice */}
                    <div className="pt-2 border-t border-slate-100 dark:border-zinc-800/60 flex items-center justify-between text-2xs">
                      {isClosed ? (
                        <div className="w-full flex items-center justify-between gap-2 text-3xs text-amber-700/90 dark:text-amber-400/90 bg-amber-50/60 dark:bg-amber-950/20 px-2 py-1 rounded border border-amber-200/40 dark:border-amber-900/30">
                          <span className="flex items-center gap-1 truncate" title={project.privateDetails?.notice}>
                            <ShieldAlert className="w-3 h-3 text-amber-500 shrink-0" />
                            <span className="truncate font-medium">{project.privateDetails?.badge || 'Closed-source / Enterprise NDA'}</span>
                          </span>
                          {project.links && project.links.length > 0 && (
                            <a
                              href={project.links[0].url}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-0.5 text-3xs text-slate-700 dark:text-zinc-300 hover:text-emerald-500 dark:hover:text-emerald-400 font-medium shrink-0 ml-auto"
                            >
                              <span>Case Study</span>
                              <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          )}
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 flex-wrap">
                          {project.links?.map((link) => (
                            <a
                              key={link.label}
                              href={link.url}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 text-3xs font-medium text-slate-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                            >
                              {link.type === 'repo' ? (
                                <GithubIcon className="w-2.5 h-2.5" />
                              ) : link.type === 'docs' ? (
                                <FileText className="w-2.5 h-2.5" />
                              ) : (
                                <ExternalLink className="w-2.5 h-2.5" />
                              )}
                              <span>{link.label}</span>
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
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
