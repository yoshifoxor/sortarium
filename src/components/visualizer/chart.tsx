import { ElementStatus } from '@/constants';
import { SortHistory, SortHistoryStep } from '@/types';
import { ElementStatus as ElementStatusType } from '@/types/element';

import { Bar } from './bar';

interface ChartProps {
  max: number;
  sortHistorySteps: SortHistory;
  step: number;
}

const getElementStatus = (index: number, sortHistoryStep: SortHistoryStep) => {
  let barStatus: ElementStatusType;

  if (sortHistoryStep.swapping.includes(index)) {
    barStatus = ElementStatus.SWAPPING.name;
  } else if (sortHistoryStep.sorted.includes(index)) {
    barStatus = ElementStatus.SORTED.name;
  } else if (sortHistoryStep.comparing.includes(index)) {
    barStatus = ElementStatus.COMPARING.name;
  } else barStatus = ElementStatus.WAITING.name;

  return barStatus;
};

export function Chart({ max, sortHistorySteps, step }: ChartProps) {
  const sortHistoryStep = sortHistorySteps.get(step);
  if (sortHistoryStep === undefined) {
    return null;
  }

  const array = sortHistoryStep.array;
  const size = array.size;
  // console.log(array);

  return (
    <div id='chart' className="flex h-[50vh] flex-row items-end">
      {array.map((value, index) => {
        const width = 100 / size;
        const height = (value / max) * 100;

        const marginRight = index === size ? 'mr-0' : 'mr-[0.1rem]';
        const className = marginRight;

        const status = getElementStatus(index, sortHistoryStep);

        return (
          <Bar
            id={`bar_${index}`}
            key={index}
            className={className}
            width={width}
            height={height}
            status={status}
          />
        );
      })}
    </div>
  );
}
