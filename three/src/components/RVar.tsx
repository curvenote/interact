export interface RVarProps {
  name: string;
  value: number;
  format?: string;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "r-var": React.DetailedHTMLProps<
        RVarProps & React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

function RVar({ name, value, format }: RVarProps) {
  return <r-var name={name} value={value} format={format}></r-var>;
}

export default RVar;
