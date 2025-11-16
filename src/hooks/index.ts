import { useEffect, useRef, useState } from 'react';

/**
 * ブール値の状態を切り替えるカスタムフック
 * @param {boolean} initial - 初期状態
 * @returns {readonly [value: boolean, toggle: () => void, turnOn: () => void, turnOff: () => void]} 現在の状態と制御関数
 */
export const useToggle = (initial: boolean) => {
  const [value, setValue] = useState<boolean>(initial);

  const toggle = () => setValue(!value);
  const turnOn = () => setValue(true);
  const turnOff = () => setValue(false);

  return [value, toggle, turnOn, turnOff] as const;
};

/**
 * 指定範囲内でカウンターを管理するカスタムフック
 * @param {number} initial - 初期値
 * @param {number} min - 最小値
 * @param {number} max - 最大値
 * @returns {readonly [counter: number, inc: () => void, dec: () => void, reset: () => void]} 現在のカウント値と制御関数
 */
export const useCounter = (initial: number, min: number, max: number) => {
  const [counter, setCounter] = useState<number>(initial);

  const inc = () => {
    setCounter(Math.min(counter + 1, max));
  };
  const dec = () => setCounter(Math.max(counter - 1, min));
  const reset = () => {
    console.log('reset');
    setCounter(initial);
    console.log('counter', counter);
  };

  return [counter, inc, dec, reset] as const;
};

/**
 * 指定間隔で関数を実行するインターバルを管理するカスタムフック
 * @param {() => void} f - 実行する関数
 * @param {number} delayMs - 実行間隔（ミリ秒）
 * @param {boolean} active - インターバルを実行するかどうか
 * @param {boolean} immediateStart - 開始時に即座に関数を実行するかどうか
 * @returns {void}
 */
export function useInterval(
  f: () => void,
  delayMs: number,
  active: boolean,
  immediateStart: boolean,
): void {
  const savedRefCallback = useRef<() => void>(null);

  useEffect(() => {
    savedRefCallback.current = f;
  });

  function cb() {
    if (savedRefCallback.current) {
      savedRefCallback.current();
    }
  }

  useEffect(() => {
    if (active) {
      if (immediateStart) {
        cb();
      }
      const interval = setInterval(cb, delayMs);

      return () => {
        clearInterval(interval);
      };
    }
  }, [active, delayMs, immediateStart]);
}
