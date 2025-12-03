import { memo } from 'react';

import { cn } from '@/lib/utils';
import { LegendItem } from '@/types/legend';

type LegendItemProps = LegendItem & {
  id: string;
};

interface Props {
  items: LegendItem[];
}

function Item({ id, color, label }: LegendItemProps) {
  const className = cn('mr-1 h-[1rem] w-[1rem] overflow-hidden rounded-md', color);
  return (
    <div id={id} className='mr-auto flex flex-row items-center'>
      <div className={className}></div>
      <span className="text-gray-700">{label}</span>
    </div>
  );
};

function Component({ items }: Props) {
  return (
    <div id='legend' className='flex flex-col'>
      {items.map((item, index) => (
        <Item
          id={`legend_item_${index}`}
          key={index}
          color={item.color}
          label={item.label}
        />
      ))}
    </div>
  );
};

export const Legend = memo(Component);
