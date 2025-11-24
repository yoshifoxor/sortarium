import { cn } from '@/lib/utils';
import { LegendItem as Item } from '@/types';

type LegendItemProps = Item & {
  id: string;
};

type Props = {
  items: Item[];
};

function LegendItem({ id, color, label }: LegendItemProps) {
  const className = cn(`mr-1 h-4 w-4 overflow-hidden rounded-full`, color);

  return (
    <div id={id} className="mr-2 flex flex-row items-center">
      <div className={className}></div>
      <span className="text-gray-700">{label}</span>
    </div>
  );
}

export function Legend({ items }: Props) {
  return (
    <div id="legend" className="flex w-[25vw]">
      {items.map((item, index) => (
        <LegendItem
          id={`legend_item[${index}]`}
          key={index}
          color={item.color}
          label={item.label}
        />
      ))}
    </div>
  );
}
