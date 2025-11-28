import { SortHistory } from './sortHistory';

export type SortMapping = {
  name: string;
  value: (_array: number[]) => SortHistory;
};
