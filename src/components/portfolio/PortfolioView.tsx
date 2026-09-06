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

  return (
    <div
      className={`w-full max-w-6xl mx-auto flex flex-col justify-start ${
        isEmbed
          ? 'p-4 sm:p-6 max-h-full overflow-y-auto'
          : 'min-h-screen lg:h-screen p-4 sm:p-6 lg:p-6 overflow-x-hidden overflow-y-auto lg:overflow-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden'
      }`}
    >
      {/* Combined Two-Column Layout on Desktop, Single Continuous Vertical Flow on Mobile / Tablet */}
      <div
        className={`w-full max-w-full ${
          isDesktop
            ? 'grid grid-cols-12 gap-8 items-start'
            : isStacked
            ? 'flex flex-col gap-6'
            : 'flex flex-col gap-6 lg:grid lg:grid-cols-12 lg:gap-8 lg:items-start'
        }`}
      >
        {/* Left Column on Desktop / Top Section on Mobile/Tablet: Profile */}
        <section
          id="panel-profile"
          aria-label="Developer Profile"
          className={`w-full min-w-0 flex flex-col shrink-0 ${
            isDesktop
              ? 'col-span-4 sticky top-6'
              : isStacked
              ? ''
              : 'lg:col-span-4 xl:col-span-4 lg:sticky lg:top-6'
          }`}
        >
          <ProfileCard profile={activeData.profile} socials={activeData.socials} />
        </section>

        {/* Right Column on Desktop / Bottom Section on Mobile/Tablet: Projects + Work History + Writing */}
        <section
          id="panel-work"
          aria-label="Engineering Projects, Experience, and Writing"
          className={`w-full min-w-0 flex flex-col gap-4 pr-1 lg:pr-2 [scrollbar-width:thin] [scrollbar-color:#d4d4d8_transparent] ${
            isDesktop
              ? 'col-span-8'
              : isStacked
              ? ''
              : 'lg:col-span-8 xl:col-span-8'
          } ${
            isEmbed ? '' : 'lg:max-h-[calc(100vh-3rem)] lg:overflow-y-auto'
          }`}
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
