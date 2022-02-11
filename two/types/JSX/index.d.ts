/* eslint-disable @typescript-eslint/prefer-namespace-keyword */
// https://fettblog.eu/typescript-react-extending-jsx-elements/
import * as React from "react";

interface InkScope {
  name: string;
}

interface InkOutline {
  for: string;
  open: boolean;
}

interface InkCode {
  language: string;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "r-scope": React.DetailedHTMLProps<
        InkScope & React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      "r-outline": React.DetailedHTMLProps<
        InkOutline & React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      "r-code": React.DetailedHTMLProps<
        InkCode & React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}
