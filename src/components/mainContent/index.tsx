'use client';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { BubbleSort } from '@/algorithms/bubbleSort/index';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Visualizer } from '@/components/visualizer';
import { useCounter, useInterval, useToggle } from '@/hooks';
import { AppState } from '@/types/index';
import { generateRandomArray } from '@/utils/array';

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

  const setDelay = useCallback((delay: number) => {
    setState((s) => {
      return { ...s, delayMs: delay };
    });
  }, []);

  // 現在のstate.arrayに対してソートアルゴリズムを実行し、ソート過程の全ステップの履歴を取得
  const { array, sort } = state;
  const sortHistory = useMemo(() => sort(array), [array, sort]);

  // ソート可視化のステップ管理（現在のステップ、次へ、前へ、リセット）を取得
  // 初期値: 0、最小値: 0、最大値: sortHistoryの長さ-1
  const [step, incStep, decStep, rstStep] = useCounter(
    0,
    0,
    sortHistory.length - 1,
  );

  // rstStep関数をmemo化してresetStepとして保存（不必要な再生成を防止）
  const resetStep = useCallback(rstStep, []);

  // state.sizeやmin/maxが変わると、新しいランダム配列を生成してリセット
  useEffect(() => {
    setArray(generateRandomArray(state.size, state.min, state.max));
  }, [state.min, state.max, state.size, setArray]);

  // ソート再生状態を管理（再生中/停止中、トグル、停止）
  const [playing, togglePlaying, , turnOffPlaying] = useToggle(false);

  // playingがtrueでdelayMsごとにincStep()を実行（ソートアニメーションの自動進行）
  useInterval(
    () => {
      incStep();
    },
    state.delayMs,
    playing,
    false,
  );

  // ソートが完了（ステップが最後に達した）したら、自動的に再生を停止
  useEffect(() => {
    if (step === sortHistory.length - 1) {
      turnOffPlaying();
    }
  }, [step, sortHistory, playing, turnOffPlaying]);

  return (
    <main className="@container mx-auto px-6 @3xl:px-0">
      <div className="min-h-[80vh] py-10">
        <Card className="mb-10 p-5 text-center">
          <CardContent>
            <Button
              id="play_stop_button"
              className="m-1 mt-3 w-[9vw]"
              onClick={togglePlaying}
            >
              {playing ? 'stop' : 'play'}
            </Button>
            <Button
              id="shuffle_button"
              className="m-1 mt-3 w-[9vw]"
              onClick={() => {
                setArray(generateRandomArray(state.size, state.min, state.max));
                turnOffPlaying();
                resetStep();

                console.log(`step[0]: ${sortHistory[1].array[0]}`);
              }}
            >
              shuffle
            </Button>
            <Button
              id="prev_step_button"
              className="m-2 w-[4vw] flex-row"
              onClick={() => {
                turnOffPlaying();
                decStep();
              }}
            >
              {'<-'}
            </Button>
            <Button
              id="next_step_button"
              className="m-2 w-[4vw] flex-row"
              onClick={() => {
                turnOffPlaying();
                incStep();
              }}
            >
              {'->'}
            </Button>
            <div className="flex flex-col items-center justify-center">
              <p className="mt-3">Array Size: {state.size}</p>
              <Slider
                id="slider_array_size"
                className="mt-3"
                defaultValue={[state.size]}
                min={10}
                max={100}
                onValueChange={([size]: number[]) => {
                  setSize(size);
                  resetStep();
                  turnOffPlaying();
                }}
              />
              <p className="mt-3">Delay: {state.delayMs} ms</p>
              <Slider
                id="slider_delay_change"
                className="mt-3"
                defaultValue={[state.delayMs]}
                min={0}
                max={1000}
                onValueChange={([size]: number[]) => {
                  setDelay(size);
                }}
              />
            </div>
          </CardContent>
        </Card>

        <Visualizer max={state.max} sortHistory={sortHistory} step={step} />
      </div>
    </main>
  );
}
