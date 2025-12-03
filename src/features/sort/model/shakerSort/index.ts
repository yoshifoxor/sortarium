import { List } from 'immutable';

import {
  addToComparing,
  addToSorted,
  addToSwapping,
  cleanStatuses,
  initializeSteps,
} from '@/features/sort/lib/helpers';
import { SortType } from '@/features/sort/model';
import { generateFromToArray } from '@/lib/array';
import { getUnsafe, swapUnsafe } from '@/lib/immutable';

const sort = (array: List<number>) => {
  let nums = array.slice();
  let historySteps = initializeSteps(nums);

  for (let i = 0; i < nums.size / 2; i++) {
    let swapped = false;
    for (let j = i; j < nums.size - i - 1; j++) {
      historySteps = addToComparing(historySteps, j, j + 1);
      if (getUnsafe(nums, j) > getUnsafe(nums, j + 1)) {
        nums = swapUnsafe(nums, j, j + 1);
        historySteps = addToSwapping(historySteps, j, j + 1);
        swapped = true;
      }
      historySteps = cleanStatuses(historySteps);
    }
    historySteps = addToSorted(historySteps, [nums.size - i - 1]);
    for (let j = array.size - 2 - i; j > i; j--) {
      historySteps = addToComparing(historySteps, j, j + 1);
      if (getUnsafe(nums, j) < getUnsafe(nums, j - 1)) {
        nums = swapUnsafe(nums, j, j - 1);
        historySteps = addToSwapping(historySteps, j, j - 1);
        swapped = true;
      }
      historySteps = cleanStatuses(historySteps);
    }

    if (!swapped) {
      historySteps = addToSorted(
        historySteps,
        generateFromToArray(i, nums.size - i - 1),
      );
      break;
    }

    historySteps = addToSorted(historySteps, [i]);
  }

  return historySteps;
};

export const ShakerSort: SortType = {
  name: 'Shaker Sort',
  sort,
};
