export interface RDisplayProps {
  value?: number;
  bindToValue?: string;
  format?: string;
  bindToTransform?: string;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "r-display": React.DetailedHTMLProps<
        {
          value?: number;
          [":value"]?: string;
          format?: string;
          [":transform"]?: string;
        } & React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

export function RDisplay({
  value,
  bindToValue,
  format,
  bindToTransform,
}: RDisplayProps) {
  return (
    <r-display
      {...{ ":value": bindToValue, ":transform": bindToTransform }}
      value={value}
      format={format}
    ></r-display>
  );
}
