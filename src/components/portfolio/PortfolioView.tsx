import type { FullPortfolioData } from '../../data/portfolioData';
import ProfileCard from './ProfileCard';
import ProjectsArea from './ProjectsArea';
import WorkHistory from './WorkHistory';
import WritingArea from './WritingArea';

interface PortfolioViewProps {
  data: FullPortfolioData;
  isEmbed?: boolean;
}

export default function PortfolioView({ data, isEmbed = false }: PortfolioViewProps) {
  return (
    <div
      className={`w-full max-w-6xl mx-auto flex flex-col justify-start ${
        isEmbed
          ? 'p-4 sm:p-6 max-h-full overflow-y-auto'
          : 'min-h-screen lg:h-screen p-4 sm:p-6 lg:p-6 overflow-x-hidden overflow-y-auto lg:overflow-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden'
      }`}
    >
      {/* Combined Two-Column Layout on Desktop, Single Continuous Vertical Flow on Mobile */}
      <div className="w-full max-w-full flex flex-col gap-6 lg:grid lg:grid-cols-12 lg:gap-8 lg:items-start">
        {/* Left Column on Desktop / Top Section on Mobile: Profile */}
        <section
          id="panel-profile"
          aria-label="Developer Profile"
          className="w-full min-w-0 flex flex-col lg:col-span-4 xl:col-span-4 shrink-0 lg:sticky lg:top-6"
        >
          <ProfileCard profile={data.profile} socials={data.socials} />
        </section>

        {/* Right Column on Desktop / Bottom Section on Mobile: Projects + Work History + Writing */}
        <section
          id="panel-work"
          aria-label="Engineering Projects, Experience, and Writing"
          className={`w-full min-w-0 flex flex-col gap-4 lg:col-span-8 xl:col-span-8 pr-1 lg:pr-2 [scrollbar-width:thin] [scrollbar-color:#d4d4d8_transparent] ${
            isEmbed ? '' : 'lg:max-h-[calc(100vh-3rem)] lg:overflow-y-auto'
          }`}
        >
          {/* Projects Area */}
          <ProjectsArea projects={data.projects} />

          {/* Work Experience */}
          <WorkHistory experiences={data.experiences} />

          {/* Writing Area */}
          <WritingArea writings={data.writings} />
        </section>
      </div>
    </div>
  );
}
