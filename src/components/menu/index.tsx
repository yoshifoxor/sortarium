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
          flex w-full flex-col justify-around overflow-visible p-4 align-middle
          lg:flex-row
        `,
        className,
      )}
    >
      <Card className="mb-10 flex-1 p-5 text-center">
        <CardContent>
          <div className="mb-3 flex text-lg font-bold">
            <AlgorithmList items={sortOptions} onSortChange={onSortChange} />
          </div>
        </CardContent>
      </Card>
      <Card className="mb-10 flex-2 p-5 text-center">
        <CardContent className="flex">
          <div
            id={`${id}_play_stop_button`}
            className={`
              mx-0 mb-4 flex-1 basis-1/6 align-middle
              lg:mr-4 lg:mb-auto
            `}
          >
            <Button
              id="play_stop_button"
              className="block w-full"
              onClick={onPlayPause}
            >
              {playing ? 'stop' : 'play'}
            </Button>
          </div>

          <div
            id={`${id}_shuffle_button`}
            className={`
              mx-0 mb-4 flex-1 basis-1/6 align-middle
              lg:mr-4 lg:mb-auto
            `}
          >
            <Button
              id="shuffle_button"
              className="block w-full"
              onClick={onShuffle}
            >
              shuffle
            </Button>
          </div>

          <div
            id={`${id}_step_buttons`}
            className={`
              mx-0 mb-4 flex-1 basis-1/6 align-middle
              lg:mr-4 lg:mb-auto
            `}
          >
            <div className="flex w-full flex-row">
              <Button
                id="prev_step_button"
                className="mr-1 flex-1 basis-1/2"
                onClick={onPrevStep}
              >
                {'<-'}
              </Button>

              <Button
                id="next_step_button"
                className="flex-1 basis-1/2"
                onClick={onNextStep}
              >
                {'->'}
              </Button>
            </div>
          </div>

          <div
            id={`${id}_size_slider`}
            className={`
              mx-0 mb-4 flex-1 basis-1/6 align-middle
              lg:mr-4 lg:mb-auto
            `}
          >
            <Label className='mb-4' htmlFor="size_slider">Array size : {size}</Label>
            <Slider
              id="size_slider"
              defaultValue={[size]}
              min={10}
              max={100}
              onValueChange={onSizeChange}
            />
          </div>

          <div
            id={`${id}_delay_slider`}
            className={`
              mx-0 mb-4 flex-1 basis-1/6 align-middle
              lg:mr-4 lg:mb-auto
            `}
          >
            <Label className='mb-4' htmlFor="delay_slider">Delay : {delayMs} ms</Label>
            <Slider
              id="delay_slider"
              defaultValue={[delayMs]}
              min={0}
              max={1000}
              onValueChange={onDelayChange}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
