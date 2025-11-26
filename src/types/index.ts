export type AppState = {
  array: number[];
  min: number;
  max: number;
  size: number;
  delayMs: number;
  sort: ((ar: number[]) => SortHistory) | undefined;
};

export type SortHistoryStep = {
  step: number;
  array: number[];
  sorted: number[];
  swapping: number[];
  comparing: number[];
};

export type SortHistory = SortHistoryStep[];

export type ElementStatusType = 'comparing' | 'sorted' | 'swapping' | 'waiting';

export type LegendItem = {
  color: string;
  label: string;
};

export type SortMapping = {
  name: string;
  value: (_array: number[]) => SortHistory;
};

