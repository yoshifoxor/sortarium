import { List } from 'immutable';

import { SortHistory } from '@/types';

export interface SortType {
  name: string;
  sort: (array: List<number>) => SortHistory;
}

export * from './bubbleSort';
export * from './insertionSort';
export * from './quickSort';
export * from './selectionSort';
export * from './shakerSort';
