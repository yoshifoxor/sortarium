import { ElementStatus } from '@/constants';
import { cn } from '@/lib/utils';
import { SortHistoryStep, LegendItem } from '@/types/index';

import { Chart } from './chart';
import { Legend } from './legend';
import { Step } from './step';

type Props = {
  sortHistory: SortHistoryStep[];
  max: number;
  step: number;
  className?: string;
};

const LEGEND_ITEMS: LegendItem[] = [
  {
    color: ElementStatus.WAITING.color,
    label: 'UNSORTED',
  },
  {
    color: ElementStatus.SORTED.color,
    label: ElementStatus.SORTED.name.toUpperCase(),
  },
  {
    color: ElementStatus.COMPARING.color,
    label: ElementStatus.COMPARING.name.toUpperCase(),
  },
  {
    color: ElementStatus.SWAPPING.color,
    label: ElementStatus.SWAPPING.name.toUpperCase(),
  },
];

export function Visualizer({ sortHistory, max, step, className }: Props) {
  return (
    <div
      id="visualizer"
      className={cn("flex w-full flex-col bg-neutral-300 p-4", className)}
    >
      <Step step={step} max={sortHistory.length - 1} />
      <Legend items={LEGEND_ITEMS} />
      <Chart max={max} sortHistorySteps={sortHistory} step={step} />
    </div>
  );
}
