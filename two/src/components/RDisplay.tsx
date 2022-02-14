export interface RDisplayProps {
  value?: number;
  bindToValue?: string;
  format?: string;
  transform?: string;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "r-display": React.DetailedHTMLProps<
        RDisplayProps & React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

function RDisplay({ value, bindToValue, format, transform }: RDisplayProps) {
  return (
    <r-display
      {...{ ":value": bindToValue }}
      value={value}
      format={format}
      transform={transform}
    ></r-display>
  );
}

export default RDisplay;
