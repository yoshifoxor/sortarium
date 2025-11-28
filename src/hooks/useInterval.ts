import { useEffect, useRef } from 'react';

type Props = {
  delayMs: number;
  active: boolean;
  immediateStart: boolean;
};

export default function useInterval(
  f: () => void,
  { delayMs, active, immediateStart }: Props,
): void {
  const savedRefCallback = useRef<() => void>(undefined);

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
