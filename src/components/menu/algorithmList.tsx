import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

type Props = {
  items: string[];
  onSortChange: (_option: string) => void;
};

export function AlgorithmList({ items, onSortChange }: Props) {
  return (
    <RadioGroup className="grid grid-cols-3 gap-2" defaultValue="Bubble Sort">
      {items.map((item, id) => (
        <div key={id}>
          <RadioGroupItem
            key={id}
            value={item}
            id={`algorithm_${id}_rgi`}
            className="peer sr-only"
            onClick={() => onSortChange(item)}
          />
          <Label
            id='algorithm_${id}_l'
            htmlFor={`algorithm_${id}_rgi`}
            className={`
              block cursor-pointer rounded p-2 text-center select-none
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
