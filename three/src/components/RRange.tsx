export interface RRangeProps {
  bind: string;
  value?: number;
  min?: number;
  max?: number;
  step?: number;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "r-range": React.DetailedHTMLProps<
        RRangeProps & React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

function RRange({ bind, value, min, max, step }: RRangeProps) {
  return (
    <r-range
      bind={bind}
      value={value}
      min={min}
      max={max}
      step={step}
    ></r-range>
  );
}

export default RRange;
