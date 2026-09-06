import { useState, useEffect } from 'react';
import type {
  FullPortfolioData,
  DeveloperProfile,
  SocialLink,
  ProjectItem,
  ExperienceItem,
  WritingItem,
} from '../../data/portfolioData';
import { defaultPortfolioData } from '../../data/portfolioData';
import PortfolioView from '../portfolio/PortfolioView';
import ProfileEditor from './tabs/ProfileEditor';
import ProjectsEditor from './tabs/ProjectsEditor';
import ExperienceEditor from './tabs/ExperienceEditor';
import WritingEditor from './tabs/WritingEditor';
import PublishModal from './PublishModal';
import {
  User,
  FolderGit2,
  Briefcase,
  FileText,
  Monitor,
  Tablet,
  Smartphone,
  Check,
  RotateCcw,
  Share2,
  Lock,
  ArrowLeft,
  Eye,
  Edit3,
  ExternalLink,
} from 'lucide-react';

const STORAGE_KEY = 'monofolio_data_v1';

export default function StudioApp() {
  const [data, setData] = useState<FullPortfolioData>(defaultPortfolioData);
  const [activeTab, setActiveTab] = useState<'profile' | 'projects' | 'experience' | 'writing'>('profile');
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isPublishOpen, setIsPublishOpen] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving'>('saved');
  const [mobilePane, setMobilePane] = useState<'editor' | 'preview'>('editor');

  // Auto-detect mobile viewport on client mount so mobile devices get native mobile preview
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setPreviewMode('mobile');
    }
  }, []);

  // Reset preview scroll when toggling view mode or mobile pane
  useEffect(() => {
    const vp = document.getElementById('studio-preview-viewport');
    if (vp) {
      vp.scrollTop = 0;
    }
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [previewMode, mobilePane]);

  // Load from localStorage on client mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.profile && parsed.projects) {
          setData(parsed);
        }
      }
    } catch (e) {
      console.error('Failed to load local data', e);
    }
  }, []);

  // Save to localStorage on data change
  const updateData = (newData: FullPortfolioData) => {
    setData(newData);
    setSaveStatus('saving');
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
      setTimeout(() => setSaveStatus('saved'), 400);
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  };

  const handleUpdateProfile = (updated: Partial<DeveloperProfile>) => {
    updateData({
      ...data,
      profile: { ...data.profile, ...updated },
    });
  };

  const handleUpdateSocials = (socials: SocialLink[]) => {
    updateData({ ...data, socials });
  };

  const handleUpdateProjects = (projects: ProjectItem[]) => {
    updateData({ ...data, projects });
  };

  const handleUpdateExperiences = (experiences: ExperienceItem[]) => {
    updateData({ ...data, experiences });
  };

  const handleUpdateWritings = (writings: WritingItem[]) => {
    updateData({ ...data, writings });
  };

  const handleResetToDefault = () => {
    if (window.confirm('Reset all changes and restore default demo data?')) {
      updateData(defaultPortfolioData);
    }
  };

  const getPreviewWidthClass = () => {
    switch (previewMode) {
      case 'desktop':
        return 'w-full max-w-5xl';
      case 'tablet':
        return 'w-full max-w-[768px]';
      case 'mobile':
        return 'w-full max-w-[420px]';
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User, count: null },
    { id: 'projects', label: 'Projects', icon: FolderGit2, count: data.projects.length },
    { id: 'experience', label: 'Experience', icon: Briefcase, count: data.experiences.length },
    { id: 'writing', label: 'Writing', icon: FileText, count: data.writings.length },
  ] as const;

  const slug = data.profile.name
    ? data.profile.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    : 'builder';

  return (
    <div className="w-full min-h-screen lg:h-screen lg:max-h-screen flex flex-col bg-[#fbfbfb] text-zinc-900 font-sans selection:bg-zinc-200 overflow-x-hidden lg:overflow-hidden">
      {/* Top Navigation Bar */}
      <header className="w-full bg-white border-b border-zinc-200/80 px-3 sm:px-5 py-2.5 flex items-center justify-between gap-3 sticky top-0 z-30 shadow-2xs shrink-0">
        {/* Left: Brand & Back */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <a
            href="/"
            className="flex items-center gap-1 px-1.5 sm:px-2 py-1 rounded-md text-xs font-mono text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 transition-colors shrink-0"
            title="Back to Landing Page"
          >
            <ArrowLeft className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden sm:inline">Landing</span>
          </a>
          <span className="text-zinc-200 shrink-0">|</span>
          <div className="flex items-center gap-1.5 font-mono text-xs font-semibold text-zinc-900 shrink-0 whitespace-nowrap">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
            <span>mono.folio</span>
            <span className="hidden xs:inline text-zinc-400 font-normal">Studio</span>
          </div>
        </div>

        {/* Center: Viewport Switcher (Anchored to exact visual center to eliminate layout shifts) */}
        <div className="hidden lg:flex items-center bg-zinc-100/90 p-0.5 rounded-lg border border-zinc-200/60 shadow-2xs absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
          <button
            type="button"
            onClick={() => setPreviewMode('desktop')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono transition-all cursor-pointer ${
              previewMode === 'desktop'
                ? 'bg-white text-zinc-900 shadow-2xs font-medium'
                : 'text-zinc-500 hover:text-zinc-800'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Desktop</span>
          </button>
          <button
            type="button"
            onClick={() => setPreviewMode('tablet')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono transition-all cursor-pointer ${
              previewMode === 'tablet'
                ? 'bg-white text-zinc-900 shadow-2xs font-medium'
                : 'text-zinc-500 hover:text-zinc-800'
            }`}
          >
            <Tablet className="w-3.5 h-3.5" />
            <span>Tablet</span>
          </button>
          <button
            type="button"
            onClick={() => setPreviewMode('mobile')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono transition-all cursor-pointer ${
              previewMode === 'mobile'
                ? 'bg-white text-zinc-900 shadow-2xs font-medium'
                : 'text-zinc-500 hover:text-zinc-800'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile</span>
          </button>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Auto-save status with fixed width to eliminate layout shift */}
          <div className="hidden sm:flex items-center justify-end w-[68px] text-[11px] font-mono text-zinc-400 shrink-0 select-none">
            {saveStatus === 'saving' ? (
              <span className="flex items-center gap-1.5 text-zinc-400">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse shrink-0" />
                <span>Saving...</span>
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-zinc-500">
                <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5] shrink-0" />
                <span>Saved</span>
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handleResetToDefault}
            title="Reset to default Julian Vance template"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50 text-xs font-mono text-zinc-600 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3 h-3 text-zinc-400" />
            <span className="hidden md:inline">Reset</span>
          </button>

          <button
            type="button"
            onClick={() => setIsPublishOpen(true)}
            className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-lg bg-zinc-900 text-white text-xs font-medium hover:bg-zinc-800 transition-all shadow-xs cursor-pointer shrink-0 whitespace-nowrap"
          >
            <Share2 className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden sm:inline">Publish / Share</span>
            <span className="sm:hidden">Share</span>
          </button>
        </div>
      </header>

      {/* Mobile Screen Switcher Bar (Editor vs Preview) - Sticky below top header */}
      <div className="lg:hidden w-full bg-white/95 backdrop-blur-xs border-b border-zinc-200/80 px-4 py-2 flex items-center justify-center gap-2 shrink-0 sticky top-[49px] z-20">
        <div className="flex items-center bg-zinc-100 p-0.5 rounded-lg w-full max-w-xs">
          <button
            type="button"
            onClick={() => setMobilePane('editor')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer ${
              mobilePane === 'editor'
                ? 'bg-white text-zinc-900 shadow-2xs font-semibold'
                : 'text-zinc-500 hover:text-zinc-800'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Editor</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setMobilePane('preview');
              setPreviewMode('mobile');
            }}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer ${
              mobilePane === 'preview'
                ? 'bg-white text-zinc-900 shadow-2xs font-semibold'
                : 'text-zinc-500 hover:text-zinc-800'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Live Preview</span>
          </button>
        </div>
      </div>

      {/* Main Studio Body: Full natural flow on mobile, 2-Column Split View on Desktop */}
      <div className="w-full flex-1 flex flex-col lg:flex-row lg:min-h-0 lg:overflow-hidden">
        {/* Left: Form Editor Sidebar */}
        <div
          className={`w-full lg:w-[460px] xl:w-[490px] lg:border-r border-zinc-200/80 bg-white flex flex-col shrink-0 lg:h-full lg:min-h-0 ${
            mobilePane === 'editor' ? 'flex' : 'hidden lg:flex'
          }`}
        >
          {/* Tab Navigation: Sticky on mobile so tab switching is always accessible */}
          <div className="grid grid-cols-4 border-b border-zinc-200/80 bg-zinc-50/95 backdrop-blur-xs p-1.5 gap-1 shrink-0 sticky top-[98px] z-10 lg:static">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center justify-center gap-1.5 py-2 px-1 rounded-lg text-xs font-medium transition-colors duration-150 cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-zinc-400 ${
                    isActive
                      ? 'bg-white text-zinc-900 shadow-2xs border border-zinc-200/80'
                      : 'text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100/60 border border-transparent'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{tab.label}</span>
                  {tab.count !== null && (
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full transition-colors duration-150 ${
                        isActive
                          ? 'bg-zinc-100 text-zinc-900 font-semibold'
                          : 'bg-zinc-200/50 text-zinc-400'
                      }`}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Active Tab Content: Natural document flow on mobile, internal scrollbar on desktop */}
          <div className="w-full p-4 sm:p-5 pb-16 sm:pb-12 lg:pb-5 lg:flex-1 lg:min-h-0 lg:overflow-y-auto [scrollbar-width:thin] [scrollbar-color:#d4d4d8_transparent]">
            {activeTab === 'profile' && (
              <ProfileEditor
                profile={data.profile}
                socials={data.socials}
                onUpdateProfile={handleUpdateProfile}
                onUpdateSocials={handleUpdateSocials}
              />
            )}
            {activeTab === 'projects' && (
              <ProjectsEditor
                projects={data.projects}
                onUpdateProjects={handleUpdateProjects}
              />
            )}
            {activeTab === 'experience' && (
              <ExperienceEditor
                experiences={data.experiences}
                onUpdateExperiences={handleUpdateExperiences}
              />
            )}
            {activeTab === 'writing' && (
              <WritingEditor
                writings={data.writings}
                onUpdateWritings={handleUpdateWritings}
              />
            )}
          </div>
        </div>

        {/* Right: Real-time Live Preview Canvas */}
        <div
          className={`w-full flex-1 bg-zinc-100/70 p-3 sm:p-5 pb-16 sm:pb-12 lg:pb-5 flex flex-col items-center justify-start lg:h-full lg:min-h-0 lg:overflow-hidden ${
            mobilePane === 'preview' ? 'flex' : 'hidden lg:flex'
          }`}
        >
          <div className={`transition-[max-width,width] duration-300 ease-in-out ${getPreviewWidthClass()} w-full flex flex-col lg:h-full lg:min-h-0`}>
            {/* Window Frame Mockup Container */}
            <div className="w-full rounded-xl border border-zinc-200/90 shadow-xl shadow-zinc-200/50 bg-[#fcfcfc] overflow-hidden flex flex-col lg:h-full lg:min-h-0 isolate [contain:paint]">
              {/* Window Top Chrome (Permanently anchored to top of mockup) */}
              <div className="w-full bg-zinc-100/95 border-b border-zinc-200/90 px-3.5 py-2 flex items-center gap-2.5 sm:gap-3.5 shadow-2xs shrink-0 select-none">
                {/* Traffic light dots */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57] border border-[#e0443e]"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e] border border-[#d89e24]"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#28c840] border border-[#1aab29]"></span>
                </div>

                {/* Flexible Address Bar: Stretches gracefully adjacent to traffic lights */}
                <div className="flex-1 min-w-0 flex items-center">
                  <a
                    href="/preview"
                    target="_blank"
                    rel="noreferrer"
                    title={`Open live preview in new tab (mono.folio/${slug})`}
                    className="w-full flex items-center justify-between gap-2 px-2.5 sm:px-3 py-1 rounded-md bg-white border border-zinc-200/80 text-[11px] font-mono text-zinc-500 shadow-2xs hover:border-zinc-300 hover:text-zinc-700 transition-colors group cursor-pointer"
                  >
                    <div className="flex items-center gap-1.5 min-w-0 truncate">
                      <Lock className="w-3 h-3 text-zinc-400 group-hover:text-zinc-600 shrink-0 transition-colors" />
                      <span className="truncate">mono.folio/{slug}</span>
                    </div>
                    <ExternalLink className="w-3 h-3 text-zinc-400 group-hover:text-zinc-700 inline-flex items-center shrink-0 ml-1 transition-colors" />
                  </a>
                </div>

                {/* Viewport indicators */}
                <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider shrink-0 whitespace-nowrap">
                  {previewMode} view
                </div>
              </div>

              {/* Window Frame Inner Canvas: Live Portfolio (Natural flow on mobile, internal scrollbar on desktop) */}
              <div
                id="studio-preview-viewport"
                className="w-full p-4 sm:p-8 lg:flex-1 lg:min-h-0 lg:overflow-y-auto [scrollbar-width:thin] [scrollbar-color:#d4d4d8_transparent]"
              >
                <PortfolioView data={data} forceMode={previewMode} isEmbed={true} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Publish & Share Modal */}
      <PublishModal
        isOpen={isPublishOpen}
        onClose={() => setIsPublishOpen(false)}
        data={data}
        onImportData={(imported) => updateData(imported)}
      />
    </div>
  );
}
