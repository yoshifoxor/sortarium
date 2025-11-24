import { BubbleSort } from './bubbleSort';
import { SelectionSort } from './selectionSort';
import { ShakerSort } from './shakerSort';

export const sorts = [
  BubbleSort,
  ShakerSort,
  SelectionSort,
] as const;

export { BubbleSort, SelectionSort, ShakerSort };
