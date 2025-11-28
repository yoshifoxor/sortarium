'use client';

import { Menu } from '@/components/menu';
import { Visualizer } from '@/components/visualizer';

import { useMainState } from './hooks';

export function MainContent() {
  const [
    { step, size, isPlaying, max, sortHistory, sortOptions, delayMs },
    controls,
  ] = useMainState();

  return (
    <main className="m-2 flex flex-col justify-around px-6 lg:m-4 @3xl:px-0">
      <Visualizer
        className="rounded-lg p-4"
        max={max}
        sortHistory={sortHistory}
        step={step}
      />
      <Menu
        id="menu"
        className="rounded-lg p-4"
        size={size}
        delayMs={delayMs[0]}
        playing={isPlaying}
        sortOptions={sortOptions}
        {...controls}
      />
    </main>
  );
}
