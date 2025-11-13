import { ElementStatus } from '@/constants';
import { SortHistoryStep, ElementStatusType } from '@/types/index';

import { Bar } from './bar';

type Props = {
  max: number;
  sortHistorySteps: SortHistoryStep[];
  step: number;
};

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

export function Chart({ max, sortHistorySteps, step }: Props) {
  const array = sortHistorySteps[step].array;
  const size = array.length;
  // console.log(array);

  return (
    <div className="flex h-[45vh] flex-row items-end">
      {array.map((value, index) => {
        const width = 100 / size;
        const height = (value / max) * 100;

        const marginRight = index === size ? 'mr-0' : 'mr-[0.1rem]';
        const className = marginRight;

        const status = getElementStatus(index, sortHistorySteps[step]);

        return (
          <Bar
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
