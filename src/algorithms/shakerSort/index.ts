import {
  addToComparing,
  addToSorted,
  addToSwapping,
  cleanStatuses,
  initializeSteps,
} from '@/algorithms/helpers';
import { generateFromToArray, swapUnsafe } from '@/lib/array';
import { SortHistory } from '@/types';

export const ShakerSort = (array: number[]): SortHistory => {
  let nums = array.slice();
  let historySteps = initializeSteps(nums);

  for (let i = 0; i < nums.length / 2; i++) {
    let swapped = false;
    for (let j = i; j < nums.length - i - 1; j++) {
      historySteps = addToComparing(historySteps, j, j + 1);
      if (nums[j] > nums[j + 1]) {
        nums = swapUnsafe(nums, j, j + 1);
        historySteps = addToSwapping(historySteps, j, j + 1);
        swapped = true;
      }
      historySteps = cleanStatuses(historySteps);
    }
    historySteps = addToSorted(historySteps, [nums.length - i - 1]);
    for (let j = array.length - 2 - i; j > i; j--) {
      historySteps = addToComparing(historySteps, j, j + 1);
      if (nums[j] < nums[j - 1]) {
        nums = swapUnsafe(nums, j, j - 1);
        historySteps = addToSwapping(historySteps, j, j - 1);
        swapped = true;
      }
      historySteps = cleanStatuses(historySteps);
    }
    if (!swapped) {
      historySteps = addToSorted(
        historySteps,
        generateFromToArray(i, nums.length - i - 2),
      );
      break;
    }

    historySteps = addToSorted(historySteps, [i]);
  }

  return historySteps;
};
