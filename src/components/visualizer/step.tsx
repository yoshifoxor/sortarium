type Props = {
  max: number;
  step: number;
};

export function Step({ max, step }: Props) {
  return (
    <span
      className={`
        inline-flex w-fit items-center rounded bg-blue-600 px-2 py-1 text-sm
        font-medium text-white
      `}
    >{`Step: ${step} / ${max}`}</span>
  );
}
