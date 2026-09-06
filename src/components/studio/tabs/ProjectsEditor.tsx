import { useState } from 'react';
import type { ProjectItem } from '../../../data/portfolioData';
import { Plus, Trash2, ArrowUp, ArrowDown, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';

interface ProjectsEditorProps {
  projects: ProjectItem[];
  onUpdateProjects: (updated: ProjectItem[]) => void;
}

export default function ProjectsEditor({ projects, onUpdateProjects }: ProjectsEditorProps) {
  const [expandedId, setExpandedId] = useState<string | null>(projects[0]?.id || null);

  const handleAddProject = () => {
    const newId = `project-${Date.now()}`;
    const newProject: ProjectItem = {
      id: newId,
      title: 'New Project',
      tagline: 'High-performance distributed system component',
      year: new Date().getFullYear().toString(),
      url: 'https://github.com/username/project',
    };
    onUpdateProjects([newProject, ...projects]);
    setExpandedId(newId);
  };

  const handleDelete = (id: string) => {
    onUpdateProjects(projects.filter((p) => p.id !== id));
    if (expandedId === id) setExpandedId(null);
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const newIdx = direction === 'up' ? index - 1 : index + 1;
    if (newIdx < 0 || newIdx >= projects.length) return;
    const next = [...projects];
    const [moved] = next.splice(index, 1);
    next.splice(newIdx, 0, moved);
    onUpdateProjects(next);
  };

  const handleChange = (id: string, field: keyof ProjectItem, value: string) => {
    onUpdateProjects(
      projects.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-2">
        <div>
          <h3 className="text-xs font-semibold text-zinc-900">Featured Projects</h3>
          <p className="text-[11px] font-mono text-zinc-400">
            {projects.length} project{projects.length !== 1 ? 's' : ''} in single-screen portfolio
          </p>
        </div>
        <button
          type="button"
          onClick={handleAddProject}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-zinc-900 text-white text-xs font-medium hover:bg-zinc-800 transition-colors shadow-2xs cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Project</span>
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-10 px-4 border border-dashed border-zinc-200 rounded-xl bg-zinc-50/50">
          <p className="text-xs text-zinc-500 font-mono mb-3">No projects added yet.</p>
          <button
            type="button"
            onClick={handleAddProject}
            className="px-3 py-1.5 rounded-lg bg-white border border-zinc-200 text-xs font-medium text-zinc-900 hover:bg-zinc-50 transition-colors cursor-pointer shadow-2xs"
          >
            + Create First Project
          </button>
        </div>
      ) : (
        <div className="space-y-2.5">
          {projects.map((project, index) => {
            const isExpanded = expandedId === project.id;
            return (
              <div
                key={project.id}
                className="border border-zinc-200 rounded-xl bg-white shadow-2xs transition-all overflow-hidden"
              >
                {/* Header / Summary Bar */}
                <div
                  onClick={() => setExpandedId(isExpanded ? null : project.id)}
                  className="px-3.5 py-2.5 flex items-center justify-between gap-2 cursor-pointer hover:bg-zinc-50/60 transition-colors select-none"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-[10px] font-mono text-zinc-400 w-4 shrink-0">
                      #{index + 1}
                    </span>
                    <span className="text-xs font-semibold text-zinc-900 truncate">
                      {project.title || 'Untitled Project'}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-400 bg-zinc-100 px-1.5 py-0.5 rounded shrink-0">
                      {project.year || '—'}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      disabled={index === 0}
                      onClick={() => handleMove(index, 'up')}
                      title="Move Up"
                      className="p-1 text-zinc-400 hover:text-zinc-700 disabled:opacity-30 disabled:hover:text-zinc-400 transition-colors cursor-pointer"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={index === projects.length - 1}
                      onClick={() => handleMove(index, 'down')}
                      title="Move Down"
                      className="p-1 text-zinc-400 hover:text-zinc-700 disabled:opacity-30 disabled:hover:text-zinc-400 transition-colors cursor-pointer"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(project.id)}
                      title="Delete Project"
                      className="p-1 text-zinc-400 hover:text-red-600 transition-colors cursor-pointer ml-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setExpandedId(isExpanded ? null : project.id)}
                      className="p-1 text-zinc-400 hover:text-zinc-700 transition-colors cursor-pointer ml-1"
                    >
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-zinc-600" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-zinc-400" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Expanded Form Fields */}
                {isExpanded && (
                  <div className="p-3.5 pt-1 border-t border-zinc-100 bg-zinc-50/40 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
                      <div className="sm:col-span-3">
                        <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-1 flex items-center justify-between">
                          <span>Project Title</span>
                          <span className="text-zinc-400 font-normal">{project.title.length}/50</span>
                        </label>
                        <input
                          type="text"
                          maxLength={50}
                          value={project.title}
                          onChange={(e) => handleChange(project.id, 'title', e.target.value)}
                          placeholder="e.g. Vortex KV"
                          className="w-full px-2.5 py-1.5 text-xs font-medium text-zinc-900 bg-white border border-zinc-200 rounded-lg outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900/10"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-1 flex items-center justify-between">
                          <span>Year</span>
                          <span className="text-zinc-400 font-normal">{project.year.length}/12</span>
                        </label>
                        <input
                          type="text"
                          maxLength={12}
                          value={project.year}
                          onChange={(e) => handleChange(project.id, 'year', e.target.value)}
                          placeholder="e.g. 2024"
                          className="w-full px-2.5 py-1.5 text-xs font-mono text-zinc-900 bg-white border border-zinc-200 rounded-lg outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900/10"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-1 flex items-center justify-between">
                        <span>One-Line Tagline / Description</span>
                        <span className="text-zinc-400 font-normal">{project.tagline.length}/100</span>
                      </label>
                      <input
                        type="text"
                        maxLength={100}
                        value={project.tagline}
                        onChange={(e) => handleChange(project.id, 'tagline', e.target.value)}
                        placeholder="e.g. Distributed key-value engine written in Rust"
                        className="w-full px-2.5 py-1.5 text-xs text-zinc-900 bg-white border border-zinc-200 rounded-lg outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900/10 font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-1 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span>Project Link (URL)</span>
                          <span className="text-zinc-400 font-normal">{(project.url || '').length}/200</span>
                        </div>
                        {project.url && (
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-[10px] font-mono text-zinc-500 hover:text-zinc-900 lowercase"
                          >
                            <span>test link</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        )}
                      </label>
                      <input
                        type="url"
                        maxLength={200}
                        value={project.url || ''}
                        onChange={(e) => handleChange(project.id, 'url', e.target.value)}
                        placeholder="https://github.com/..."
                        className="w-full px-2.5 py-1.5 text-xs text-zinc-900 bg-white border border-zinc-200 rounded-lg outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900/10 font-mono"
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
