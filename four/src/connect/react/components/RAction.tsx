export interface RActionProps {
  bindToClick?: string;
  children: React.ReactNode;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "r-action": React.DetailedHTMLProps<
        {
          [":click"]?: string;
        } & React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

function RAction({ bindToClick, children }: RActionProps) {
  return (
    <r-action {...{ ":click": bindToClick, ":hover": () => {} }}>
      {children}
    </r-action>
  );
}

export default RAction;
