export interface RScopeProps {
  name: string;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "r-scope": React.DetailedHTMLProps<
        RScopeProps & React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

function RScope({ name }: RScopeProps) {
  return <r-scope name={name}></r-scope>;
}

export default RScope;
