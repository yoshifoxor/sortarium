import { ElementStatus } from '@/constants';
import { cn } from '@/lib/utils';
import { ElementStatusType } from '@/types';

type Props = {
  width: number;
  height: number;
  className: string;
  status: ElementStatusType;
};

export function Bar({ width, height, className, status }: Props) {
  let color: string = '';
  switch (status) {
    case ElementStatus.SWAPPING.name:
      color = ElementStatus.SWAPPING.color;
      break;
    case ElementStatus.SORTED.name:
      color = ElementStatus.SORTED.color;
      break;
    case ElementStatus.COMPARING.name:
      color = ElementStatus.COMPARING.color;
      break;
    case ElementStatus.WAITING.name:
      color = ElementStatus.WAITING.color;
      break;
  }
  const styles = {
    height: `${height}%`,
    width: `${width}%`,
  };

  return (
    <div
      className={cn('flex items-end', className, color)}
      style={styles}
    ></div>
  );
}
