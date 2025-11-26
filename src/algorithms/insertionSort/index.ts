import {
  addToSorted,
  addToSwapping,
  cleanStatuses,
  initializeSteps,
} from '@/algorithms/helpers';
import { SortHistory } from '@/types';

export const InsertionSort = (array: number[]): SortHistory => {
  const nums = array.slice();
  let historySteps: SortHistory = initializeSteps(nums);

  for (let i = 0; i < nums.length; i++) {
    const tmp = nums[i];
    let j = i - 1;

    while (j >= 0 && nums[j] > tmp) {
      historySteps = addToSwapping(historySteps, j, j + 1);
      nums[j + 1] = nums[j];
      j--;
    }
    historySteps = cleanStatuses(historySteps);
    nums[j + 1] = tmp;
  }

  for (let i = 0; i < nums.length; i++) {
    historySteps = addToSorted(historySteps, [i]);
  }
  return historySteps;
};
