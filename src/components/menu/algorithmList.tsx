import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

type Props = {
  items: string[];
  onSortChange: (_option: string) => void;
};

export function AlgorithmList({ items, onSortChange }: Props) {
  return (
    <RadioGroup className="grid grid-cols-3 gap-2">
      {items.map((item, id) => (
        <div key={id}>
          <RadioGroupItem
            key={id}
            value={item}
            defaultValue="Bubble Sort"
            id={`algorithm_${id}`}
            className="peer sr-only"
            onClick={() => onSortChange(item)}
          />
          <Label
            htmlFor={`algorithm_${id}`}
            className={`
              block cursor-pointer rounded-xl p-2 text-center select-none
              peer-data-[state=checked]:bg-blue-500
              peer-data-[state=checked]:font-extrabold
              peer-data-[state=checked]:text-white
            `}
          >
            {item}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
}
