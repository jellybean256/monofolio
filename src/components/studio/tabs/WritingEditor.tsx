import { useState } from 'react';
import type { WritingItem } from '../../../data/portfolioData';
import { Plus, Trash2, ArrowUp, ArrowDown, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';

interface WritingEditorProps {
  writings: WritingItem[];
  onUpdateWritings: (updated: WritingItem[]) => void;
}

export default function WritingEditor({ writings, onUpdateWritings }: WritingEditorProps) {
  const [expandedId, setExpandedId] = useState<string | null>(writings[0]?.id || null);

  const handleAdd = () => {
    const newId = `write-${Date.now()}`;
    const newWriting: WritingItem = {
      id: newId,
      title: 'Architectural Decisions and Trade-offs',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      description: 'Why simplicity in systems design is difficult to maintain and how deep modules help.',
      url: 'https://example.com/essay',
    };
    onUpdateWritings([newWriting, ...writings]);
    setExpandedId(newId);
  };

  const handleDelete = (id: string) => {
    onUpdateWritings(writings.filter((w) => w.id !== id));
    if (expandedId === id) setExpandedId(null);
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const newIdx = direction === 'up' ? index - 1 : index + 1;
    if (newIdx < 0 || newIdx >= writings.length) return;
    const next = [...writings];
    const [moved] = next.splice(index, 1);
    next.splice(newIdx, 0, moved);
    onUpdateWritings(next);
  };

  const handleChange = (id: string, field: keyof WritingItem, value: string) => {
    onUpdateWritings(
      writings.map((w) => (w.id === id ? { ...w, [field]: value } : w))
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-2">
        <div>
          <h3 className="text-xs font-semibold text-zinc-900">Articles & Writing</h3>
          <p className="text-[11px] font-mono text-zinc-400">
            {writings.length} essay{writings.length !== 1 ? 's' : ''} listed in single-screen portfolio
          </p>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-zinc-900 text-white text-xs font-medium hover:bg-zinc-800 transition-colors shadow-2xs cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Article</span>
        </button>
      </div>

      {writings.length === 0 ? (
        <div className="text-center py-10 px-4 border border-dashed border-zinc-200 rounded-xl bg-zinc-50/50">
          <p className="text-xs text-zinc-500 font-mono mb-3">No essays or articles added yet.</p>
          <button
            type="button"
            onClick={handleAdd}
            className="px-3 py-1.5 rounded-lg bg-white border border-zinc-200 text-xs font-medium text-zinc-900 hover:bg-zinc-50 transition-colors cursor-pointer shadow-2xs"
          >
            + Add First Article
          </button>
        </div>
      ) : (
        <div className="space-y-2.5">
          {writings.map((writing, index) => {
            const isExpanded = expandedId === writing.id;
            return (
              <div
                key={writing.id}
                className="border border-zinc-200 rounded-xl bg-white shadow-2xs transition-all overflow-hidden"
              >
                {/* Header / Summary Bar */}
                <div
                  onClick={() => setExpandedId(isExpanded ? null : writing.id)}
                  className="px-3.5 py-2.5 flex items-center justify-between gap-2 cursor-pointer hover:bg-zinc-50/60 transition-colors select-none"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-[10px] font-mono text-zinc-400 w-4 shrink-0">
                      #{index + 1}
                    </span>
                    <span className="text-xs font-semibold text-zinc-900 truncate">
                      {writing.title || 'Untitled Article'}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-400 bg-zinc-100 px-1.5 py-0.5 rounded shrink-0">
                      {writing.date || '—'}
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
                      disabled={index === writings.length - 1}
                      onClick={() => handleMove(index, 'down')}
                      title="Move Down"
                      className="p-1 text-zinc-400 hover:text-zinc-700 disabled:opacity-30 disabled:hover:text-zinc-400 transition-colors cursor-pointer"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(writing.id)}
                      title="Delete Article"
                      className="p-1 text-zinc-400 hover:text-red-600 transition-colors cursor-pointer ml-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setExpandedId(isExpanded ? null : writing.id)}
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
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      <div className="sm:col-span-2">
                        <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-1 flex items-center justify-between">
                          <span>Article Title</span>
                          <span className="text-zinc-400 font-normal">{writing.title.length}/90</span>
                        </label>
                        <input
                          type="text"
                          maxLength={90}
                          value={writing.title}
                          onChange={(e) => handleChange(writing.id, 'title', e.target.value)}
                          placeholder="e.g. Taste Is a Skill"
                          className="w-full px-2.5 py-1.5 text-xs font-semibold text-zinc-900 bg-white border border-zinc-200 rounded-lg outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900/10"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-1 flex items-center justify-between">
                          <span>Publication Date</span>
                          <span className="text-zinc-400 font-normal">{writing.date.length}/24</span>
                        </label>
                        <input
                          type="text"
                          maxLength={24}
                          value={writing.date}
                          onChange={(e) => handleChange(writing.id, 'date', e.target.value)}
                          placeholder="e.g. Aug 30, 2026"
                          className="w-full px-2.5 py-1.5 text-xs font-mono text-zinc-900 bg-white border border-zinc-200 rounded-lg outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900/10"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-1 flex items-center justify-between">
                        <span>One-Line Summary</span>
                        <span className="text-zinc-400 font-normal">{(writing.description || '').length}/140</span>
                      </label>
                      <input
                        type="text"
                        maxLength={140}
                        value={writing.description}
                        onChange={(e) => handleChange(writing.id, 'description', e.target.value)}
                        placeholder="e.g. Why good software feels different."
                        className="w-full px-2.5 py-1.5 text-xs text-zinc-900 bg-white border border-zinc-200 rounded-lg outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900/10 font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-1 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span>Article URL</span>
                          <span className="text-zinc-400 font-normal">{(writing.url || '').length}/200</span>
                        </div>
                        {writing.url && (
                          <a
                            href={writing.url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-[10px] font-mono text-zinc-500 hover:text-zinc-900 lowercase"
                          >
                            <span>read article</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        )}
                      </label>
                      <input
                        type="url"
                        maxLength={200}
                        value={writing.url || ''}
                        onChange={(e) => handleChange(writing.id, 'url', e.target.value)}
                        placeholder="https://medium.com/@... or blog link"
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
