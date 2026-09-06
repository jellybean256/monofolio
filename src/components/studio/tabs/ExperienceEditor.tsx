import { useState } from 'react';
import type { ExperienceItem } from '../../../data/portfolioData';
import { Plus, Trash2, ArrowUp, ArrowDown, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';

interface ExperienceEditorProps {
  experiences: ExperienceItem[];
  onUpdateExperiences: (updated: ExperienceItem[]) => void;
}

export default function ExperienceEditor({ experiences, onUpdateExperiences }: ExperienceEditorProps) {
  const [expandedId, setExpandedId] = useState<string | null>(experiences[0]?.id || null);

  const handleAdd = () => {
    const newId = `exp-${Date.now()}`;
    const newExp: ExperienceItem = {
      id: newId,
      company: 'Acme Systems',
      role: 'Staff Infrastructure Engineer',
      period: '2024 — Present',
      url: 'https://example.com',
    };
    onUpdateExperiences([newExp, ...experiences]);
    setExpandedId(newId);
  };

  const handleDelete = (id: string) => {
    onUpdateExperiences(experiences.filter((e) => e.id !== id));
    if (expandedId === id) setExpandedId(null);
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const newIdx = direction === 'up' ? index - 1 : index + 1;
    if (newIdx < 0 || newIdx >= experiences.length) return;
    const next = [...experiences];
    const [moved] = next.splice(index, 1);
    next.splice(newIdx, 0, moved);
    onUpdateExperiences(next);
  };

  const handleChange = (id: string, field: keyof ExperienceItem, value: string) => {
    onUpdateExperiences(
      experiences.map((e) => (e.id === id ? { ...e, [field]: value } : e))
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-2">
        <div>
          <h3 className="text-xs font-semibold text-zinc-900">Work Experience</h3>
          <p className="text-[11px] font-mono text-zinc-400">
            {experiences.length} position{experiences.length !== 1 ? 's' : ''} shown in tree timeline
          </p>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-zinc-900 text-white text-xs font-medium hover:bg-zinc-800 transition-colors shadow-2xs cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Position</span>
        </button>
      </div>

      {experiences.length === 0 ? (
        <div className="text-center py-10 px-4 border border-dashed border-zinc-200 rounded-xl bg-zinc-50/50">
          <p className="text-xs text-zinc-500 font-mono mb-3">No work experience added yet.</p>
          <button
            type="button"
            onClick={handleAdd}
            className="px-3 py-1.5 rounded-lg bg-white border border-zinc-200 text-xs font-medium text-zinc-900 hover:bg-zinc-50 transition-colors cursor-pointer shadow-2xs"
          >
            + Add First Position
          </button>
        </div>
      ) : (
        <div className="space-y-2.5">
          {experiences.map((exp, index) => {
            const isExpanded = expandedId === exp.id;
            return (
              <div
                key={exp.id}
                className="border border-zinc-200 rounded-xl bg-white shadow-2xs transition-all overflow-hidden"
              >
                {/* Header / Summary Bar */}
                <div
                  onClick={() => setExpandedId(isExpanded ? null : exp.id)}
                  className="px-3.5 py-2.5 flex items-center justify-between gap-2 cursor-pointer hover:bg-zinc-50/60 transition-colors select-none"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-[10px] font-mono text-zinc-400 w-4 shrink-0">
                      #{index + 1}
                    </span>
                    <span className="text-xs font-semibold text-zinc-900 truncate">
                      {exp.company || 'Untitled Company'}
                    </span>
                    <span className="text-[11px] text-zinc-500 truncate hidden sm:inline">
                      • {exp.role}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-400 bg-zinc-100 px-1.5 py-0.5 rounded shrink-0">
                      {exp.period || '—'}
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
                      disabled={index === experiences.length - 1}
                      onClick={() => handleMove(index, 'down')}
                      title="Move Down"
                      className="p-1 text-zinc-400 hover:text-zinc-700 disabled:opacity-30 disabled:hover:text-zinc-400 transition-colors cursor-pointer"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(exp.id)}
                      title="Delete Position"
                      className="p-1 text-zinc-400 hover:text-red-600 transition-colors cursor-pointer ml-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setExpandedId(isExpanded ? null : exp.id)}
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div>
                        <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-1">
                          Company / Organization
                        </label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => handleChange(exp.id, 'company', e.target.value)}
                          placeholder="e.g. Vortex Labs"
                          className="w-full px-2.5 py-1.5 text-xs font-semibold text-zinc-900 bg-white border border-zinc-200 rounded-lg outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900/10"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-1">
                          Period / Years
                        </label>
                        <input
                          type="text"
                          value={exp.period}
                          onChange={(e) => handleChange(exp.id, 'period', e.target.value)}
                          placeholder="e.g. 2023 — Present"
                          className="w-full px-2.5 py-1.5 text-xs font-mono text-zinc-900 bg-white border border-zinc-200 rounded-lg outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900/10"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-1">
                        Role / Title
                      </label>
                      <input
                        type="text"
                        value={exp.role}
                        onChange={(e) => handleChange(exp.id, 'role', e.target.value)}
                        placeholder="e.g. Staff Systems Architect"
                        className="w-full px-2.5 py-1.5 text-xs text-zinc-900 bg-white border border-zinc-200 rounded-lg outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900/10 font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-1 flex items-center justify-between">
                        <span>Company URL (Optional)</span>
                        {exp.url && (
                          <a
                            href={exp.url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-[10px] font-mono text-zinc-500 hover:text-zinc-900 lowercase"
                          >
                            <span>visit site</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        )}
                      </label>
                      <input
                        type="url"
                        value={exp.url || ''}
                        onChange={(e) => handleChange(exp.id, 'url', e.target.value)}
                        placeholder="https://vortexlabs.dev"
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
