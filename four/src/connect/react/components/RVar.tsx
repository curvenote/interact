import { createElement as e } from "react";

export interface RVarProps {
  name: string;
  value: number | string | boolean | Record<string, string>;
  format?: string;
  type?: string;
}

// declare global {
//   namespace JSX {
//     interface IntrinsicElements {
//       "r-var": React.DetailedHTMLProps<
//         RVarProps & React.HTMLAttributes<HTMLElement>,
//         HTMLElement
//       >;
//     }
//   }
// }

// function RVar({ name, value, format }: RVarProps) {
//   return <r-var name={name} value={value} format={format}></r-var>;
// }

function RVar({ name, value, format, type }: RVarProps) {
  return e("r-var", {
    name,
    value,
    format,
    type,
  });
}

export default RVar;
