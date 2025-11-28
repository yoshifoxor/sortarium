import { BubbleSort } from './bubbleSort';
import { InsertionSort } from './insertionSort';
import { QuickSort } from './quickSort';
import { SelectionSort } from './selectionSort';
import { ShakerSort } from './shakerSort';

export const sorts = [
  BubbleSort,
  InsertionSort,
  QuickSort,
  ShakerSort,
  SelectionSort,
] as const;

export { BubbleSort, InsertionSort, QuickSort, SelectionSort, ShakerSort };
