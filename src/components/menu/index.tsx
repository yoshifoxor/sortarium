import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

import { AlgorithmList } from './algorithmList';

type Props = {
  id: string;
  className?: string;
  size: number;
  delayMs: number;
  playing: boolean;
  sortOptions: string[];
  onShuffle: () => void;
  onPlayPause: () => void;
  onPrevStep: () => void;
  onNextStep: () => void;
  onDelayChange: (_delayMs: [number]) => void;
  onSizeChange: (_size: [number]) => void;
  onSortChange: (_option: string) => void;
};

export function Menu({
  id,
  className,
  size,
  delayMs,
  playing,
  sortOptions,
  onShuffle,
  onPlayPause,
  onPrevStep,
  onNextStep,
  onDelayChange,
  onSizeChange,
  onSortChange,
}: Props) {
  return (
    <div
      id={id}
      className={cn(
        `
          flex w-full flex-col justify-around overflow-visible align-middle
          lg:flex-row
        `,
        className,
      )}
    >
      <Card className="mb-4 flex-1 p-5 text-center lg:mr-4">
        <CardContent>
          <div className="flex text-lg font-bold">
            <AlgorithmList items={sortOptions} onSortChange={onSortChange} />
          </div>
        </CardContent>
      </Card>
      <Card
        className={`
          mb-4 flex flex-1 grow flex-row place-items-center p-5
          lg:ml-4
        `}
      >
        <CardContent
          className={`
            flex w-full flex-col items-center justify-between
            lg:flex-row
          `}
        >
          <div className="flex w-full flex-col items-center lg:mr-5 lg:w-auto">
            <div className="mr-2 mb-2 lg:mb-4">
              <Button id="play_stop_button" onClick={onPlayPause}>
                {playing ? 'stop' : 'play'}
              </Button>
              <Button id="shuffle_button" onClick={onShuffle}>
                shuffle
              </Button>

              <Button id="prev_step_button" onClick={onPrevStep}>
                {'<-'}
              </Button>
              <Button id="next_step_button" onClick={onNextStep}>
                {'->'}
              </Button>
            </div>
          </div>
          <div className="flex w-full grow flex-col lg:w-auto">
            <div id={`${id}_size_slider`}>
              <Label className="mb-4" htmlFor="size_slider">
                Array size : {size}
              </Label>
              <Slider
                id="size_slider"
                defaultValue={[size]}
                min={10}
                max={100}
                onValueChange={onSizeChange}
              />
            </div>

            <div id={`${id}_delay_slider`} className="mb-2 w-full">
              <Label className="mb-4" htmlFor="delay_slider">
                Delay : {delayMs} ms
              </Label>
              <Slider
                id="delay_slider"
                defaultValue={[delayMs]}
                min={0}
                max={1000}
                onValueChange={onDelayChange}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
