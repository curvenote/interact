export interface RDynamicProps {
  bind: string;
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  sensitivity?: number;
  format?: string;
  periodic?: string;
  after?: string;
  transform?: string;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "r-dynamic": React.DetailedHTMLProps<
        RDynamicProps & React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

export function RDynamic(props: RDynamicProps) {
  return <r-dynamic {...props}></r-dynamic>;
}
