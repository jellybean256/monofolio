import { useState, useEffect } from 'react';
import type { FullPortfolioData } from '../../data/portfolioData';
import ProfileCard from './ProfileCard';
import ProjectsArea from './ProjectsArea';
import WorkHistory from './WorkHistory';
import WritingArea from './WritingArea';

interface PortfolioViewProps {
  data: FullPortfolioData;
  isEmbed?: boolean;
  forceMode?: 'desktop' | 'tablet' | 'mobile';
}

export default function PortfolioView({ data, isEmbed = false, forceMode }: PortfolioViewProps) {
  const [activeMode, setActiveMode] = useState<'desktop' | 'tablet' | 'mobile' | undefined>(forceMode);
  const [activeData, setActiveData] = useState<FullPortfolioData>(data);

  useEffect(() => {
    setActiveData(data);
  }, [data]);

  useEffect(() => {
    if (forceMode) {
      setActiveMode(forceMode);
    }
  }, [forceMode]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const v = params.get('view') as 'desktop' | 'tablet' | 'mobile' | null;
      if (v === 'desktop' || v === 'tablet' || v === 'mobile') {
        setActiveMode(v);
      }

      const dataParam = params.get('data');
      if (dataParam) {
        try {
          const decoded = decodeURIComponent(atob(dataParam));
          const parsed = JSON.parse(decoded);
          if (parsed.profile && parsed.projects) {
            setActiveData(parsed);
          }
        } catch (e) {
          console.error('Failed to parse data from URL query', e);
        }
      }

      const handleMessage = (event: MessageEvent) => {
        if (event.data && event.data.type === 'SET_VIEW_MODE') {
          setActiveMode(event.data.mode);
        }
      };

      window.addEventListener('message', handleMessage);
      return () => window.removeEventListener('message', handleMessage);
    }
  }, []);

  const isDesktop = activeMode === 'desktop';
  const isStacked = activeMode === 'tablet' || activeMode === 'mobile';

  // Container styling:
  // - If isStacked (explicit mobile/tablet): NEVER lock height or hide overflow. Let content flow naturally.
  // - If isEmbed: embedded in studio mockup or visual proof iframe.
  // - If standalone desktop: lock to single-screen h-screen with hidden outer scrollbar.
  const containerClasses = isStacked
    ? 'w-full max-w-full flex flex-col justify-start'
    : isEmbed
    ? 'w-full max-w-6xl mx-auto flex flex-col justify-start'
    : 'w-full max-w-6xl mx-auto flex flex-col justify-start min-h-screen lg:h-screen p-4 sm:p-6 lg:p-6 overflow-x-hidden overflow-y-auto lg:overflow-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden';

  // Layout grid/flex:
  const layoutClasses = isStacked
    ? 'w-full max-w-full flex flex-col gap-6'
    : isDesktop
    ? 'w-full max-w-full grid grid-cols-12 gap-8 items-start'
    : 'w-full max-w-full flex flex-col gap-6 lg:grid lg:grid-cols-12 lg:gap-8 lg:items-start';

  // Profile column styling:
  const profileClasses = isStacked
    ? 'w-full min-w-0 flex flex-col shrink-0'
    : isDesktop
    ? 'col-span-4 w-full min-w-0 flex flex-col shrink-0 sticky top-6'
    : 'w-full min-w-0 flex flex-col shrink-0 lg:col-span-4 xl:col-span-4 lg:sticky lg:top-6';

  // Work column styling:
  // - If isStacked: NEVER give it a nested scrollbar or max-h. Must flow naturally with zero nested scroll sections.
  // - If isDesktop in studio (isEmbed): max-h to scroll cleanly within simulated desktop window.
  // - If standalone desktop: lg:max-h-[calc(100vh-3rem)] lg:overflow-y-auto.
  const workClasses = isStacked
    ? 'w-full min-w-0 flex flex-col gap-4'
    : isDesktop
    ? `col-span-8 w-full min-w-0 flex flex-col gap-4 pr-1 lg:pr-2 [scrollbar-width:thin] [scrollbar-color:#d4d4d8_transparent] ${
        isEmbed ? 'max-h-[calc(100vh-14rem)] overflow-y-auto' : 'lg:max-h-[calc(100vh-3rem)] lg:overflow-y-auto'
      }`
    : 'w-full min-w-0 flex flex-col gap-4 pr-1 lg:pr-2 lg:col-span-8 xl:col-span-8 [scrollbar-width:thin] [scrollbar-color:#d4d4d8_transparent] lg:max-h-[calc(100vh-3rem)] lg:overflow-y-auto';

  return (
    <div className={containerClasses}>
      {/* Combined Two-Column Layout on Desktop, Single Continuous Vertical Flow on Mobile / Tablet */}
      <div className={layoutClasses}>
        {/* Left Column on Desktop / Top Section on Mobile/Tablet: Profile */}
        <section
          id="panel-profile"
          aria-label="Developer Profile"
          className={profileClasses}
        >
          <ProfileCard profile={activeData.profile} socials={activeData.socials} />
        </section>

        {/* Right Column on Desktop / Bottom Section on Mobile/Tablet: Projects + Work History + Writing */}
        <section
          id="panel-work"
          aria-label="Engineering Projects, Experience, and Writing"
          className={workClasses}
        >
          {/* Projects Area */}
          <ProjectsArea projects={activeData.projects} mode={activeMode} />

          {/* Work Experience */}
          <WorkHistory experiences={activeData.experiences} mode={activeMode} />

          {/* Writing Area */}
          <WritingArea writings={activeData.writings} />
        </section>
      </div>
    </div>
  );
}
