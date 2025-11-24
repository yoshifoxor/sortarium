import { BubbleSort } from './bubbleSort';
import { QuickSort } from './quickSort';
import { SelectionSort } from './selectionSort';
import { ShakerSort } from './shakerSort';

export const sorts = [
  BubbleSort,
  ShakerSort,
  SelectionSort,
  QuickSort,
] as const;

export { BubbleSort, SelectionSort, ShakerSort, QuickSort };
