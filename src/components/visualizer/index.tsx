import { ElementStatus } from '@/constants';
import { SortHistoryStep, LegendItem } from '@/types/index';

import { Chart } from './chart';
import { Legend } from './legend';
import { Step } from './step';

type Props = {
  sortHistory: SortHistoryStep[];
  max: number;
  step: number;
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

export function Visualizer({ sortHistory, max, step }: Props) {
  return (
    <div
      id="visualizer"
      className="m-4 mt-1 flex h-[100dvh] w-auto flex-col bg-neutral-300 p-4"
    >
      <Step step={step} max={sortHistory.length - 1} />
      <Legend items={LEGEND_ITEMS} />
      <Chart max={max} sortHistorySteps={sortHistory} step={step} />
    </div>
  );
}
