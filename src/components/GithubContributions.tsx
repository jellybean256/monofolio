import React, { useState, useMemo } from 'react';
import { Flame, Award, Calendar, ExternalLink } from 'lucide-react';
import { GithubIcon } from './Icons';
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

  // Extract month markers for the top
  const monthLabels = useMemo(() => {
    const labels: { name: string; weekIndex: number }[] = [];
    let lastMonth = -1;

    weeks.forEach((week, index) => {
      const firstDay = new Date(week[0].date);
      const month = firstDay.getMonth();
      if (month !== lastMonth && index < 48) {
        labels.push({
          name: firstDay.toLocaleDateString('en-US', { month: 'short' }),
          weekIndex: index,
        });
        lastMonth = month;
      }
    });

    return labels;
  }, [weeks]);

  // GitHub contribution color classes for dark & light mode
  const getLevelClass = (level: number) => {
    switch (level) {
      case 0:
        return 'bg-slate-100 dark:bg-zinc-800/80 hover:ring-1 hover:ring-slate-300 dark:hover:ring-zinc-600';
      case 1:
        return 'bg-emerald-200 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-300 hover:ring-1 hover:ring-emerald-400';
      case 2:
        return 'bg-emerald-400 dark:bg-emerald-800/90 text-emerald-950 dark:text-emerald-100 hover:ring-1 hover:ring-emerald-400';
      case 3:
        return 'bg-emerald-500 dark:bg-emerald-600 text-white hover:ring-1 hover:ring-emerald-300';
      case 4:
        return 'bg-emerald-600 dark:bg-emerald-400 text-white dark:text-zinc-950 hover:ring-1 hover:ring-emerald-300';
      default:
        return 'bg-slate-100 dark:bg-zinc-800/80';
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
    <div className="shrink-0 bg-white dark:bg-zinc-900/90 rounded-xl border border-slate-200/90 dark:border-zinc-800/80 p-3 sm:p-3.5 shadow-2xs flex flex-col justify-between">
      {/* Header: Title, Stats & Link */}
      <div className="flex items-center justify-between gap-3 mb-2 shrink-0">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded-md bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300">
            <GithubIcon className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-slate-900 dark:text-zinc-100">
                GitHub Activity
              </span>
              <span className="text-3xs px-1.5 py-0.2 rounded-full font-mono bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60">
                {githubSummary.totalLastYear.toLocaleString()} commits past year
              </span>
            </div>
          </div>
        </div>

        {/* Streaks & External Link */}
        <div className="flex items-center gap-3 text-2xs font-mono">
          <div className="hidden sm:flex items-center gap-1 text-slate-600 dark:text-zinc-400">
            <Flame className="w-3 h-3 text-amber-500" />
            <span>{githubSummary.currentStreakDays}d streak</span>
          </div>
          <div className="hidden md:flex items-center gap-1 text-slate-600 dark:text-zinc-400">
            <Award className="w-3 h-3 text-indigo-400" />
            <span>{githubSummary.longestStreakDays}d record</span>
          </div>
          <a
            href={githubSummary.profileUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-3xs font-medium text-slate-500 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
          >
            <span>Profile</span>
            <ExternalLink className="w-2.5 h-2.5" />
          </a>
        </div>
      </div>

      {/* Heatmap Grid */}
      <div className="overflow-x-auto custom-scrollbar pb-1">
        <div className="inline-block min-w-full">
          {/* Months Row */}
          <div className="flex text-3xs font-mono text-slate-400 dark:text-zinc-500 mb-1 pl-4.5 gap-[3px]">
            {monthLabels.map((m, idx) => (
              <span
                key={idx}
                style={{
                  minWidth: `${(52 / monthLabels.length) * 11}px`,
                }}
                className="truncate"
              >
                {m.name}
              </span>
            ))}
          </div>

          {/* Grid: 7 rows of 52 weeks */}
          <div className="flex gap-1.5 items-start">
            {/* Days of week labels */}
            <div className="flex flex-col justify-between text-3xs font-mono text-slate-400 dark:text-zinc-500 h-[77px] pr-1 select-none leading-none pt-0.5">
              <span>M</span>
              <span>W</span>
              <span>F</span>
            </div>

            {/* Matrix of days */}
            <div className="flex gap-[3px]">
              {weeks.map((week, weekIdx) => (
                <div key={weekIdx} className="flex flex-col gap-[3px]">
                  {week.map((day, dayIdx) => (
                    <div
                      key={dayIdx}
                      onMouseEnter={(e) => handleMouseEnter(day, e)}
                      onMouseLeave={handleMouseLeave}
                      tabIndex={0}
                      aria-label={`${day.count} contributions on ${day.date}`}
                      className={`w-[10px] h-[10px] sm:w-[11px] sm:h-[11px] rounded-[2px] transition-all cursor-pointer ${getLevelClass(
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

      {/* Bottom bar: Legend and status */}
      <div className="mt-2 pt-1.5 border-t border-slate-100 dark:border-zinc-800/60 flex items-center justify-between text-3xs font-mono text-slate-500 dark:text-zinc-500">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Syncing automatically via GitHub API</span>
        </span>

        <div className="flex items-center gap-1.5">
          <span>Less</span>
          <div className="flex gap-[2px]">
            <span className="w-2.5 h-2.5 rounded-[2px] bg-slate-100 dark:bg-zinc-800" />
            <span className="w-2.5 h-2.5 rounded-[2px] bg-emerald-200 dark:bg-emerald-950/80" />
            <span className="w-2.5 h-2.5 rounded-[2px] bg-emerald-400 dark:bg-emerald-800/90" />
            <span className="w-2.5 h-2.5 rounded-[2px] bg-emerald-500 dark:bg-emerald-600" />
            <span className="w-2.5 h-2.5 rounded-[2px] bg-emerald-600 dark:bg-emerald-400" />
          </div>
          <span>More</span>
        </div>
      </div>

      {/* Interactive Floating Tooltip */}
      {hoveredDay && tooltipPos && (
        <div
          style={{
            position: 'fixed',
            left: `${tooltipPos.x}px`,
            top: `${tooltipPos.y}px`,
            transform: 'translate(-50%, -100%)',
          }}
          className="z-50 pointer-events-none px-2 py-1 rounded bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-3xs font-mono shadow-md whitespace-nowrap animate-in fade-in zoom-in-95 duration-100"
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
