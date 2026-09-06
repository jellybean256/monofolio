import { useState } from 'react';
import { ArrowUpRight, ChevronDown, ChevronUp, X } from 'lucide-react';
import type { Project, WorkExperience, Article } from '../data/portfolioData';

interface SolutionComparisonProps {
  allProjects: Project[];
  workHistory: WorkExperience[];
  writingArticles: Article[];
}

type SolutionMode = 'A' | 'B' | 'C';

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

export default function SolutionComparison({
  allProjects,
  workHistory,
  writingArticles,
}: SolutionComparisonProps) {
  // Support URL query param for testing & screenshots (?mode=A|B|C&modal=true&expand=true)
  const getInitialParam = (param: string, fallback: string) => {
    if (typeof window !== 'undefined') {
      const val = new URLSearchParams(window.location.search).get(param);
      if (val) return val;
    }
    return fallback;
  };

  const [mode, setMode] = useState<SolutionMode>(
    () => (getInitialParam('mode', 'A') as SolutionMode)
  );

  // State for Solution B (Modal / Archive Drawer)
  const [archiveModalOpen, setArchiveModalOpen] = useState(
    () => getInitialParam('modal', 'false') === 'true'
  );
  const [archiveTab, setArchiveTab] = useState<'projects' | 'work' | 'writing'>('projects');

  // State for Solution C (Inline Collapsibles)
  const [expandProjects, setExpandProjects] = useState(
    () => getInitialParam('expand', 'false') === 'true'
  );
  const [expandWork, setExpandWork] = useState(
    () => getInitialParam('expand', 'false') === 'true'
  );
  const [expandWriting, setExpandWriting] = useState(
    () => getInitialParam('expand', 'false') === 'true'
  );

  // Helper for project url
  const getProjectUrl = (project: Project) => {
    if (project.links && project.links.length > 0) return project.links[0].url;
    return undefined;
  };

  // Determine displayed items based on solution mode
  const displayedProjects =
    mode === 'A'
      ? allProjects
      : mode === 'B'
      ? allProjects.slice(0, 5)
      : expandProjects
      ? allProjects
      : allProjects.slice(0, 5);

  const displayedWork =
    mode === 'A'
      ? workHistory
      : mode === 'B'
      ? workHistory.slice(0, 4)
      : expandWork
      ? workHistory
      : workHistory.slice(0, 4);

  const displayedWriting =
    mode === 'A'
      ? writingArticles
      : mode === 'B'
      ? writingArticles.slice(0, 2)
      : expandWriting
      ? writingArticles
      : writingArticles.slice(0, 2);

  const openArchive = (tab: 'projects' | 'work' | 'writing') => {
    setArchiveTab(tab);
    setArchiveModalOpen(true);
  };

  return (
    <div className="flex flex-col gap-3 min-w-0 w-full">
      {/* Interactive Mode Switcher Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-1.5 px-2.5 rounded-lg bg-zinc-100/90 border border-zinc-200/80 shrink-0">
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] font-mono font-medium text-zinc-500 uppercase tracking-wider">
            Bandingkan:
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setMode('A')}
              className={`px-2 py-0.5 rounded text-xs font-mono transition-all ${
                mode === 'A'
                  ? 'bg-zinc-900 text-white font-semibold shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/60'
              }`}
            >
              Solusi A: Right Scroll
            </button>
            <button
              onClick={() => setMode('B')}
              className={`px-2 py-0.5 rounded text-xs font-mono transition-all ${
                mode === 'B'
                  ? 'bg-zinc-900 text-white font-semibold shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/60'
              }`}
            >
              Solusi B: Archive Drawer
            </button>
            <button
              onClick={() => setMode('C')}
              className={`px-2 py-0.5 rounded text-xs font-mono transition-all ${
                mode === 'C'
                  ? 'bg-zinc-900 text-white font-semibold shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/60'
              }`}
            >
              Solusi C: Inline Expand
            </button>
          </div>
        </div>

        {/* Mode Explainer Pill */}
        <span className="text-[11px] font-mono text-zinc-500 hidden sm:inline">
          {mode === 'A' && 'Kolom kanan scroll independen (Profile diam di kiri)'}
          {mode === 'B' && 'Tetap pas 1 layar + tombol "View All ↗" membuka modal'}
          {mode === 'C' && 'Tombol "+ more" untuk buka-tutup item langsung di tempat'}
        </span>
      </div>

      {/* Main Content Container with conditional scroll for Mode A & C */}
      <div
        className={`flex flex-col gap-4 min-w-0 pr-1 ${
          mode === 'A' || (mode === 'C' && (expandProjects || expandWork || expandWriting))
            ? 'lg:max-h-[calc(100vh-6.5rem)] lg:overflow-y-auto lg:pr-2 [scrollbar-width:thin] [scrollbar-color:#d4d4d8_transparent]'
            : ''
        }`}
      >
        {/* ========================================================= */}
        {/* PROJECTS SECTION */}
        {/* ========================================================= */}
        <div className="flex flex-col">
          <div className="pb-1.5 flex items-center justify-between gap-3 shrink-0 border-b border-zinc-200/50">
            <span className="text-xs font-semibold text-zinc-900 tracking-tight">
              Projects
            </span>
            {mode === 'A' && (
              <span className="text-[11px] font-mono text-zinc-400">
                {displayedProjects.length} systems
              </span>
            )}
          </div>

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
                    <div className="w-auto sm:w-48 shrink-0 flex items-center gap-1 min-w-0">
                      <span className="text-xs font-medium text-zinc-900 group-hover:text-zinc-950 group-hover:underline underline-offset-2 truncate">
                        {displayTitle}
                      </span>
                      {url && (
                        <ArrowUpRight className="w-3 h-3 text-zinc-400 group-hover:text-zinc-900 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
                      )}
                    </div>

                    <span className="hidden sm:block flex-1 min-w-0 text-[11.5px] text-zinc-500 group-hover:text-zinc-700 truncate">
                      {tagline}
                    </span>

                    <span className="text-[11px] font-mono text-zinc-400 shrink-0 text-right">
                      {year}
                    </span>
                  </div>

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

          {/* Solution B Action: View Archive */}
          {mode === 'B' && (
            <button
              onClick={() => openArchive('projects')}
              className="self-start mt-1 text-[11px] font-mono text-zinc-400 hover:text-zinc-900 transition-colors flex items-center gap-1 cursor-pointer pt-0.5"
            >
              <span>view all {allProjects.length} systems</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          )}

          {/* Solution C Action: Inline Toggle */}
          {mode === 'C' && (
            <button
              onClick={() => setExpandProjects(!expandProjects)}
              className="self-start mt-1 text-[11px] font-mono text-zinc-400 hover:text-zinc-900 transition-colors flex items-center gap-1 cursor-pointer pt-0.5"
            >
              {expandProjects ? (
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

        {/* ========================================================= */}
        {/* WORK EXPERIENCE SECTION */}
        {/* ========================================================= */}
        <div className="flex flex-col">
          <div className="pb-1.5 flex items-center justify-between gap-3 shrink-0 border-b border-zinc-200/50">
            <span className="text-xs font-semibold text-zinc-900 tracking-tight">
              Work Experience
            </span>
            {mode === 'A' && (
              <span className="text-[11px] font-mono text-zinc-400">
                {displayedWork.length} positions
              </span>
            )}
          </div>

          <div className="relative flex flex-col pt-1">
            {displayedWork.map((job, idx) => {
              const isLast = idx === displayedWork.length - 1;

              return (
                <div
                  key={job.id}
                  className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-0.5 sm:gap-2 pl-7 sm:pl-8 py-1.5 px-1.5 -mx-1.5 rounded-md hover:bg-zinc-100/70 transition-all duration-150 group"
                >
                  <span className="absolute left-3 sm:left-3.5 top-0 w-px h-3.5 sm:h-1/2 bg-zinc-200" />
                  {!isLast && (
                    <span className="absolute left-3 sm:left-3.5 top-3.5 sm:top-1/2 bottom-0 w-px bg-zinc-200" />
                  )}
                  <span className="absolute left-3 sm:left-3.5 top-3.5 sm:top-1/2 w-3.5 sm:w-4 h-px bg-zinc-200 group-hover:bg-zinc-400 transition-colors" />

                  <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-1.5 min-w-0">
                    <div className="flex items-center justify-between sm:justify-start gap-2">
                      <span className="text-xs font-semibold text-zinc-900">
                        {job.company}
                      </span>
                      <span className="sm:hidden text-[11px] font-mono text-zinc-400 shrink-0">
                        {job.period}
                      </span>
                    </div>
                    <span className="hidden sm:inline text-zinc-300 text-xs shrink-0">•</span>
                    <span className="text-[11.5px] sm:text-xs text-zinc-500 sm:text-zinc-600 sm:truncate">
                      {job.role}
                    </span>
                  </div>

                  <span className="hidden sm:inline text-[11px] font-mono text-zinc-400 shrink-0">
                    {job.period}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Solution B Action: View Archive */}
          {mode === 'B' && (
            <button
              onClick={() => openArchive('work')}
              className="self-start mt-1 text-[11px] font-mono text-zinc-400 hover:text-zinc-900 transition-colors flex items-center gap-1 cursor-pointer pt-0.5"
            >
              <span>view full career history ({workHistory.length} roles)</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          )}

          {/* Solution C Action: Inline Toggle */}
          {mode === 'C' && (
            <button
              onClick={() => setExpandWork(!expandWork)}
              className="self-start mt-1 text-[11px] font-mono text-zinc-400 hover:text-zinc-900 transition-colors flex items-center gap-1 cursor-pointer pt-0.5"
            >
              {expandWork ? (
                <>
                  <span>- show fewer</span>
                  <ChevronUp className="w-3 h-3" />
                </>
              ) : (
                <>
                  <span>+ {workHistory.length - 4} earlier roles</span>
                  <ChevronDown className="w-3 h-3" />
                </>
              )}
            </button>
          )}
        </div>

        {/* ========================================================= */}
        {/* WRITING SECTION */}
        {/* ========================================================= */}
        <div className="flex flex-col">
          <div className="pb-1.5 flex items-center justify-between gap-3 shrink-0 border-b border-zinc-200/50">
            <span className="text-xs font-semibold text-zinc-900 tracking-tight">
              Writing
            </span>
            {mode === 'A' && (
              <span className="text-[11px] font-mono text-zinc-400">
                {displayedWriting.length} articles
              </span>
            )}
          </div>

          <div className="flex flex-col pt-1 divide-y divide-zinc-100/60">
            {displayedWriting.map((article) => (
              <a
                key={article.id}
                href={article.url}
                className="group block py-1.5 px-2 -mx-2 rounded-md hover:bg-zinc-100/70 transition-all duration-150 no-underline"
              >
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="text-xs font-semibold text-zinc-900 group-hover:underline underline-offset-2">
                    {article.title}
                  </h3>
                  <span className="text-[11px] font-mono text-zinc-400 shrink-0">
                    {article.date}
                  </span>
                </div>
                <p className="text-xs text-zinc-500 leading-relaxed mt-0.5">
                  {article.description}
                </p>
              </a>
            ))}
          </div>

          {/* Solution B Action: View Archive */}
          {mode === 'B' && (
            <button
              onClick={() => openArchive('writing')}
              className="self-start mt-1 text-[11px] font-mono text-zinc-400 hover:text-zinc-900 transition-colors flex items-center gap-1 cursor-pointer pt-0.5"
            >
              <span>view all {writingArticles.length} essays</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          )}

          {/* Solution C Action: Inline Toggle */}
          {mode === 'C' && (
            <button
              onClick={() => setExpandWriting(!expandWriting)}
              className="self-start mt-1 text-[11px] font-mono text-zinc-400 hover:text-zinc-900 transition-colors flex items-center gap-1 cursor-pointer pt-0.5"
            >
              {expandWriting ? (
                <>
                  <span>- show fewer</span>
                  <ChevronUp className="w-3 h-3" />
                </>
              ) : (
                <>
                  <span>+ {writingArticles.length - 2} more essays</span>
                  <ChevronDown className="w-3 h-3" />
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* ========================================================= */}
      {/* SOLUTION B: ARCHIVE DRAWER / MODAL OVERLAY */}
      {/* ========================================================= */}
      {archiveModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-150">
          <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-zinc-200 p-5 flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-zinc-900 tracking-tight">
                  Archive Index
                </span>
                <span className="text-[11px] font-mono text-zinc-400">
                  (Solusi B: Editorial Archive)
                </span>
              </div>
              <button
                onClick={() => setArchiveModalOpen(false)}
                className="p-1 rounded-md text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Tabs */}
            <div className="flex gap-2 pt-3 pb-2 border-b border-zinc-100/70 text-xs font-mono">
              <button
                onClick={() => setArchiveTab('projects')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  archiveTab === 'projects'
                    ? 'bg-zinc-900 text-white font-medium'
                    : 'text-zinc-500 hover:text-zinc-900'
                }`}
              >
                All Projects ({allProjects.length})
              </button>
              <button
                onClick={() => setArchiveTab('work')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  archiveTab === 'work'
                    ? 'bg-zinc-900 text-white font-medium'
                    : 'text-zinc-500 hover:text-zinc-900'
                }`}
              >
                Full Career ({workHistory.length})
              </button>
              <button
                onClick={() => setArchiveTab('writing')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  archiveTab === 'writing'
                    ? 'bg-zinc-900 text-white font-medium'
                    : 'text-zinc-500 hover:text-zinc-900'
                }`}
              >
                All Essays ({writingArticles.length})
              </button>
            </div>

            {/* Modal Body: Scrollable Full List */}
            <div className="flex-1 overflow-y-auto py-3 divide-y divide-zinc-100">
              {archiveTab === 'projects' &&
                allProjects.map((p) => {
                  const meta = projectMeta[p.id] || {
                    shortTitle: p.title,
                    tagline: p.description.split('.')[0] || p.description,
                    year: '2022',
                  };
                  const url = getProjectUrl(p);

                  return (
                    <div key={p.id} className="py-2 flex items-baseline justify-between gap-3 text-xs">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="font-semibold text-zinc-900">{meta.shortTitle || p.title}</span>
                        {url && <ArrowUpRight className="w-3 h-3 text-zinc-400 shrink-0" />}
                        <span className="text-zinc-500 truncate hidden sm:inline text-[11.5px]">
                          — {meta.tagline}
                        </span>
                      </div>
                      <span className="font-mono text-[11px] text-zinc-400 shrink-0">{meta.year}</span>
                    </div>
                  );
                })}

              {archiveTab === 'work' &&
                workHistory.map((w) => (
                  <div key={w.id} className="py-2 flex items-baseline justify-between gap-3 text-xs">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="font-semibold text-zinc-900">{w.company}</span>
                      <span className="text-zinc-300">•</span>
                      <span className="text-zinc-600 truncate">{w.role}</span>
                    </div>
                    <span className="font-mono text-[11px] text-zinc-400 shrink-0">{w.period}</span>
                  </div>
                ))}

              {archiveTab === 'writing' &&
                writingArticles.map((a) => (
                  <div key={a.id} className="py-2 flex items-baseline justify-between gap-3 text-xs">
                    <div>
                      <h4 className="font-semibold text-zinc-900">{a.title}</h4>
                      <p className="text-[11.5px] text-zinc-500">{a.description}</p>
                    </div>
                    <span className="font-mono text-[11px] text-zinc-400 shrink-0">{a.date}</span>
                  </div>
                ))}
            </div>

            {/* Modal Footer */}
            <div className="pt-3 border-t border-zinc-100 flex justify-between items-center text-[11px] font-mono text-zinc-400">
              <span>Halaman utama tetap fit 1 screen</span>
              <button
                onClick={() => setArchiveModalOpen(false)}
                className="px-3 py-1 rounded bg-zinc-100 hover:bg-zinc-200 text-zinc-800 transition-colors"
              >
                Tutup (Esc)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
