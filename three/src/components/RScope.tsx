export interface RScopeProps {
  name: string;
  children: JSX.Element[];
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

function RScope({ name, children }: RScopeProps) {
  return <r-scope name={name}>{children}</r-scope>;
}

export default RScope;
