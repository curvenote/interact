// /* eslint-disable @typescript-eslint/prefer-namespace-keyword */
// // https://fettblog.eu/typescript-react-extending-jsx-elements/
// import * as React from "react";

// interface InkScope {
//   name: string;
// }

// interface InkOutline {
//   for: string;
//   open: boolean;
// }

// interface InkCode {
//   language: string;
// }

// interface InkVar {
//   name: string;
//   value: number;
//   format?: string;
// }

// interface InkDynamic {
//   bind: string;
//   value?: number;
//   min?: number;
//   max?: number;
//   step?: number;
//   sensitivity?: number;
//   format?: string;
//   periodic?: string;
//   after?: string;
//   transform?: string;
// }

// interface InkDisplay {
//   value?: number;
//   ":value"?: string;
//   format?: string;
//   transform?: string;
// }

// declare global {
//   namespace JSX {
//     interface IntrinsicElements {
//       "r-scope": React.DetailedHTMLProps<
//         InkScope & React.HTMLAttributes<HTMLElement>,
//         HTMLElement
//       >;
//       "r-var": React.DetailedHTMLProps<
//         InkVar & React.HTMLAttributes<HTMLElement>,
//         HTMLElement
//       >;
//       "r-dynamic": React.DetailedHTMLProps<
//         InkDynamic & React.HTMLAttributes<HTMLElement>,
//         HTMLElement
//       >;
//       "r-display": React.DetailedHTMLProps<
//         InkDisplay & React.HTMLAttributes<HTMLElement>,
//         HTMLElement
//       >;
//     }
//   }
// }
