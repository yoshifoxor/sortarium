import { useCallback, useEffect, useMemo, useState } from 'react';

import {
  BubbleSort,
  InsertionSort,
  QuickSort,
  SelectionSort,
  ShakerSort,
} from '@/algorithms';
import { initializeSteps } from '@/algorithms/helpers';
import { useCounter, useInterval, useToggle } from '@/hooks';
import { generateRandomArray } from '@/lib/array';
import { mapSortNameToSort } from '@/lib/sorts';
import { SortMapping } from '@/types';
import { SortHistory } from '@/types/sortHistory';

const SORTS_MAPPING: SortMapping[] = [
  {
    name: 'Bubble Sort',
    value: BubbleSort,
  },
  { name: 'Insertion Sort', value: InsertionSort },
  {
    name: 'Quick Sort',
    value: QuickSort,
  },
  {
    name: 'Shaker Sort',
    value: ShakerSort,
  },
  {
    name: 'Selection Sort',
    value: SelectionSort,
  },
];

const SORT_OPTIONS = SORTS_MAPPING.map((v) => v.name);

export const useControls = (
  size: number,
  minSize: number,
  maxSize: number,
  setSize: (_: number) => void,
  setArray: (_: number[]) => void,
  onReset: () => void,
  turnOffPlaying: () => void,
  increment: () => void,
  decrement: () => void,
) => {
  const onShuffle = useCallback(() => {
    turnOffPlaying();
    onReset();
    setArray(generateRandomArray(size, minSize, maxSize));
  }, [size, minSize, maxSize, onReset, setArray, turnOffPlaying]);

  const onPrevStep = useCallback(() => {
    turnOffPlaying();
    decrement();
  }, [decrement, turnOffPlaying]);

  const onNextStep = useCallback(() => {
    turnOffPlaying();
    increment();
  }, [increment, turnOffPlaying]);

  const onSizeChange = useCallback(
    (size: number[]) => {
      turnOffPlaying();
      setSize(size[0]);
      onReset();
    },
    [setSize, onReset, turnOffPlaying],
  );

  return {
    onShuffle,
    onSizeChange,
    onPrevStep,
    onNextStep,
    onReset,
  } as const;
};

export const useMainState = () => {
  const [min] = useState(10);
  const [max] = useState(100);
  const [size, setSize] = useState(50);
  const [array, setArray] = useState<number[]>(() => generateRandomArray(size, min, max));
  const [delayMs, setDelayMs] = useState([0]);
  const [sort, setSort] = useState<undefined | ((_: number[]) => SortHistory)>(() => BubbleSort);

  const sortHistory = useMemo(() => {
    if (sort !== undefined) {
      return sort(array);
    } else {
      return initializeSteps(array);
    }
  }, [array, sort]);

  const {
    value: isPlaying,
    toggle: onPlayPause,
    turnOff: turnOffPlaying,
  } = useToggle(false);

  const {
    count: step,
    increment,
    decrement,
    reset,
  } = useCounter(0, 0, sortHistory.length);

  const onReset = useCallback(() => reset(), [reset]);

  useInterval(
    () => {
      increment();
    },
    {
      delayMs: delayMs[0],
      active: isPlaying,
      immediateStart: false,
    },
  );

  const onSortChange = useCallback(
    (sortName: string) => {
      const mappedSort = mapSortNameToSort(sortName, SORTS_MAPPING);
      if (mappedSort !== undefined) {
        turnOffPlaying();
        onReset();
        setSort(() => mappedSort);
      }
    },
    [onReset, turnOffPlaying],
  );

  useEffect(() => {
    if (step === sortHistory.length - 1) {
      turnOffPlaying();
    }
  }, [step, turnOffPlaying, sortHistory.length]);

  const controls = useControls(
    size,
    min,
    max,
    setSize,
    setArray,
    onReset,
    turnOffPlaying,
    increment,
    decrement,
  );

  return [
    {
      step,
      size,
      delayMs,
      min,
      max,
      sortHistory,
      sortOptions: SORT_OPTIONS,
      isPlaying,
    },
    {
      ...controls,
      onPlayPause,
      setArray,
      setSize,
      onDelayChange: setDelayMs,
      onSortChange,
    },
  ] as const;
};
