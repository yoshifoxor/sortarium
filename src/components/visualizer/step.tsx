type Props = {
  step: number;
  max: number;
};

export function Step({ step, max }:Props) {
  return (
    <span className={`
      inline-flex items-center rounded bg-blue-600 px-2 py-1 text-sm font-medium
      text-white
    `}>{`Step: ${step} / ${max}`}</span>
  );
};
