import React, { useState, useMemo } from 'react';
import { ExternalLink } from 'lucide-react';
import { generateContributionData, githubSummary, type ContributionDay } from '../data/portfolioData';

export default function GithubContributions() {
  const contributionDays = useMemo(() => generateContributionData(), []);
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);

  // Group 364 days into 52 weeks of 7 days
  const weeks = useMemo(() => {
    const res: ContributionDay[][] = [];
    for (let i = 0; i < 52; i++) {
      res.push(contributionDays.slice(i * 7, (i + 1) * 7));
    }
    return res;
  }, [contributionDays]);

  // Extract month markers for the top with exact week index
  const monthLabels = useMemo(() => {
    const labels: { name: string; weekIndex: number }[] = [];
    let lastMonth = -1;

    weeks.forEach((week, index) => {
      const firstDay = new Date(week[0].date);
      const month = firstDay.getMonth();
      if (month !== lastMonth && index < 49) {
        labels.push({
          name: firstDay.toLocaleDateString('en-US', { month: 'short' }),
          weekIndex: index,
        });
        lastMonth = month;
      }
    });

    return labels;
  }, [weeks]);

  // GitHub contribution color classes
  const getLevelClass = (level: number) => {
    switch (level) {
      case 0:
        return 'bg-zinc-100 dark:bg-zinc-800/60 hover:ring-1 hover:ring-zinc-400 dark:hover:ring-zinc-500';
      case 1:
        return 'bg-emerald-200 dark:bg-emerald-950/80 hover:ring-1 hover:ring-emerald-400';
      case 2:
        return 'bg-emerald-400 dark:bg-emerald-800 hover:ring-1 hover:ring-emerald-400';
      case 3:
        return 'bg-emerald-500 dark:bg-emerald-600 hover:ring-1 hover:ring-emerald-300';
      case 4:
        return 'bg-emerald-600 dark:bg-emerald-400 hover:ring-1 hover:ring-emerald-300';
      default:
        return 'bg-zinc-100 dark:bg-zinc-800/60';
    }
  };

  const handleMouseEnter = (day: ContributionDay, e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setHoveredDay(day);
    setTooltipPos({
      x: rect.left + rect.width / 2,
      y: rect.top - 8,
    });
  };

  const handleMouseLeave = () => {
    setHoveredDay(null);
    setTooltipPos(null);
  };

  return (
    <div className="shrink-0 flex flex-col justify-between w-full pt-2">
      {/* Header: Pure focus without badge noise */}
      <div className="flex items-center justify-between gap-3 mb-2 shrink-0">
        <div className="flex items-baseline gap-2">
          <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
            GitHub Activity
          </span>
          <span className="text-xs text-zinc-400 dark:text-zinc-500">
            {githubSummary.totalLastYear.toLocaleString()} contributions in the last year
          </span>
        </div>

        <a
          href={githubSummary.profileUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-xs text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
        >
          <span>GitHub</span>
          <ExternalLink className="w-2.5 h-2.5 opacity-60" />
        </a>
      </div>

      {/* Heatmap Grid - Fully spans 100% of the card width on desktop, smoothly scrollable horizontally on narrow mobile screens */}
      <div className="w-full overflow-x-auto custom-scrollbar pb-1">
        <div className="min-w-[500px] lg:min-w-0 w-full flex items-start gap-1.5 sm:gap-2">
        {/* Days of week labels (M, W, F) row-aligned with matching gaps */}
        <div className="flex flex-col gap-[2px] sm:gap-[2.5px] md:gap-[3px] text-[9px] font-mono text-zinc-400 dark:text-zinc-500 select-none pt-4 shrink-0">
          <div className="w-2.5 aspect-square flex items-center justify-center invisible">S</div>
          <div className="w-2.5 aspect-square flex items-center justify-center leading-none">M</div>
          <div className="w-2.5 aspect-square flex items-center justify-center invisible">T</div>
          <div className="w-2.5 aspect-square flex items-center justify-center leading-none">W</div>
          <div className="w-2.5 aspect-square flex items-center justify-center invisible">T</div>
          <div className="w-2.5 aspect-square flex items-center justify-center leading-none">F</div>
          <div className="w-2.5 aspect-square flex items-center justify-center invisible">S</div>
        </div>

        {/* Matrix + Months spanning the full remaining width */}
        <div className="flex-1 min-w-0 flex flex-col">
          {/* Months Row */}
          <div className="relative w-full h-3.5 text-[9.5px] font-mono text-zinc-400 dark:text-zinc-500 mb-1 select-none">
            {monthLabels.map((m, idx) => (
              <span
                key={idx}
                style={{
                  left: `${(m.weekIndex / 52) * 100}%`,
                  position: 'absolute',
                }}
                className="truncate transform -translate-x-0.5"
              >
                {m.name}
              </span>
            ))}
          </div>

          {/* Matrix of 52 weeks spanning full width of the card */}
          <div className="w-full flex justify-between gap-[2px] sm:gap-[2.5px] md:gap-[3px]">
            {weeks.map((week, weekIdx) => (
              <div key={weekIdx} className="flex flex-col flex-1 gap-[2px] sm:gap-[2.5px] md:gap-[3px]">
                {week.map((day, dayIdx) => (
                  <div
                    key={dayIdx}
                    onMouseEnter={(e) => handleMouseEnter(day, e)}
                    onMouseLeave={handleMouseLeave}
                    tabIndex={0}
                    aria-label={`${day.count} contributions on ${day.date}`}
                    className={`w-full aspect-square rounded-[2px] transition-all cursor-pointer ${getLevelClass(
                      day.level
                    )}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>

      {/* Clean Legend */}
      <div className="mt-2 flex items-center justify-end text-[10px] font-mono text-zinc-400 dark:text-zinc-500 shrink-0">
        <div className="flex items-center gap-1.5">
          <span>Less</span>
          <div className="flex gap-[2px]">
            <span className="w-2.5 h-2.5 rounded-[2px] bg-zinc-100 dark:bg-zinc-800/60" />
            <span className="w-2.5 h-2.5 rounded-[2px] bg-emerald-200 dark:bg-emerald-950/80" />
            <span className="w-2.5 h-2.5 rounded-[2px] bg-emerald-400 dark:bg-emerald-800" />
            <span className="w-2.5 h-2.5 rounded-[2px] bg-emerald-500 dark:bg-emerald-600" />
            <span className="w-2.5 h-2.5 rounded-[2px] bg-emerald-600 dark:bg-emerald-400" />
          </div>
          <span>More</span>
        </div>
      </div>

      {/* Interactive Tooltip */}
      {hoveredDay && tooltipPos && (
        <div
          style={{
            position: 'fixed',
            left: `${tooltipPos.x}px`,
            top: `${tooltipPos.y}px`,
            transform: 'translate(-50%, -100%)',
          }}
          className="z-50 pointer-events-none px-2 py-1 rounded bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-mono shadow-md whitespace-nowrap animate-in fade-in zoom-in-95 duration-100"
        >
          <span className="font-semibold text-emerald-400 dark:text-emerald-700">
            {hoveredDay.count} {hoveredDay.count === 1 ? 'contribution' : 'contributions'}
          </span>{' '}
          on {hoveredDay.date}
        </div>
      )}
    </div>
  );
}
