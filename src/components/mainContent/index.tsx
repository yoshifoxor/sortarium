'use client';
import { useCallback, useEffect, useMemo, useState } from 'react';

import {
  BubbleSort,
  InsertionSort,
  QuickSort,
  SelectionSort,
  ShakerSort,
} from '@/algorithms';
import { Menu } from '@/components/menu';
import { Visualizer } from '@/components/visualizer';
import { useCounter, useInterval, useToggle } from '@/hooks';
import { generateRandomArray } from '@/lib/array';
import { mapSortNameToSort } from '@/lib/sorts';
import { AppState, SortMapping } from '@/types';

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

const SORT_OPTIONS = SORTS_MAPPING.map((mapping) => {
  return mapping.name;
});

export function MainContent() {
  // アプリケーションの状態を管理するStateを初期化
  // array: ソートされる配列、min/max: 配列の値の範囲、size: 配列のサイズ、delayMs: ソートアニメーションの遅延時間、sort: ソートアルゴリズム
  const [state, setState] = useState<AppState>({
    array: [],
    min: 10,
    max: 100,
    size: 50,
    delayMs: 0,
    sort: BubbleSort,
  });

  // const [sortChosen, , turnOnSortChosen] = useToggle(false);

  // 配列を更新するためのコールバック関数を作成（メモ化して不必要な再生成を防止）
  const setArray = useCallback(
    (array: number[]) =>
      setState((s) => {
        // 既存のstateを展開して、arrayのみを新しい値に置き換える
        return { ...s, array: array };
      }),
    [],
  );

  const setSize = useCallback((size: number) => {
    setState((s) => {
      return { ...s, size: size };
    });
  }, []);

  const setDelay = useCallback((delay: [number]) => {
    setState((s) => {
      return { ...s, delayMs: delay[0] };
    });
  }, []);

  // 現在のstate.arrayに対してソートアルゴリズムを実行し、ソート過程の全ステップの履歴を取得
  const { array, sort } = state;
  const sortHistory = useMemo(() => sort ? sort(array) : [], [array, sort]);

  // ソート可視化のステップ管理（現在のステップ、次へ、前へ、リセット）を取得
  // 初期値: 0、最小値: 0、最大値: sortHistoryの長さ-1
  const {count, increment, decrement, reset} = useCounter(
    0,
    0,
    sortHistory.length - 1,
  );

  // reset関数をmemo化してresetStepとして保存（不必要な再生成を防止）
  const resetStep = useCallback(reset, []);

  // state.sizeやmin/maxが変わると、新しいランダム配列を生成してリセット
  useEffect(() => {
    setArray(generateRandomArray(state.size, state.min, state.max));
  }, [state.min, state.max, state.size, setArray]);

  // ソート再生状態を管理（再生中/停止中、トグル、停止）
  const { value: playing, toggle: togglePlaying, turnOff: turnOffPlaying, } = useToggle(false);

  const setSort = useCallback((sortName: string) => {
    const sort = mapSortNameToSort(sortName, SORTS_MAPPING);
    if (sort !== undefined) {
      turnOffPlaying();
      resetStep();
      // turnOnSortChosen();
      setState((s) => {
        return { ...s, sort: sort };
      });
    }
  }, [resetStep, turnOffPlaying]);

  // playingがtrueでdelayMsごとにincStep()を実行（ソートアニメーションの自動進行）
  useInterval(
    () => {
      increment();
    },
    state.delayMs,
    playing,
    false,
  );

  // ソートが完了（ステップが最後に達した）したら、自動的に再生を停止
  useEffect(() => {
    if (count === sortHistory.length - 1) {
      turnOffPlaying();
    }
  }, [count, sortHistory, playing, turnOffPlaying]);

  const onShuffle = useCallback(() => {
    turnOffPlaying();
    resetStep();
    setArray(generateRandomArray(state.size, state.min, state.max));
  }, [state.size, state.min, state.max, resetStep, setArray, turnOffPlaying]);

  const onPrevStep = useCallback(() => {
    turnOffPlaying();
    decrement();
  }, [decrement, turnOffPlaying]);

  const onNextStep = useCallback(() => {
    turnOffPlaying();
    increment();
  }, [increment, turnOffPlaying]);

  const onSizeChange = useCallback((size) => {
    turnOffPlaying();
    setSize(size);
    resetStep();
  }, [turnOffPlaying, setSize, resetStep]);

  const delayMs = useMemo(() => state.delayMs, [state.delayMs]);

  return (
    <main className="m-2 flex flex-col justify-around px-6 lg:m-4 @3xl:px-0">
      <Visualizer
        // showSteps={sortChosen}
        className="rounded-lg p-4"
        max={state.max}
        sortHistory={sortHistory}
        step={count}
      />
      <Menu
        id="menu"
        className="rounded-lg p-4"
        size={state.size}
        delayMs={delayMs}
        playing={playing}
        sortOptions={SORT_OPTIONS}
        onShuffle={onShuffle}
        onPlayPause={togglePlaying}
        onSizeChange={onSizeChange}
        onDelayChange={setDelay}
        onPrevStep={onPrevStep}
        onNextStep={onNextStep}
        onSortChange={setSort}
      />
    </main>
  );
}
