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

export function RAction({ bindToClick, children }: RActionProps) {
  console.log("bind", bindToClick);
  return <r-action {...{ ":click": bindToClick }}>{children}</r-action>;
}
