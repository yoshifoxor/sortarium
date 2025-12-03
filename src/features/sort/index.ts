import {
  BubbleSort,
  InsertionSort,
  QuickSort,
  SelectionSort,
  ShakerSort,
  SortType,
} from './model';

export const SORTS: readonly SortType[] = [
  BubbleSort,
  InsertionSort,
  QuickSort,
  SelectionSort,
  ShakerSort,
] as const;

export const SORTS_NAMES = SORTS.map((s) => s.name);

export {
  BubbleSort,
  InsertionSort,
  QuickSort,
  SelectionSort,
  ShakerSort,
};
