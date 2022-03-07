import { createElement as e } from "react";

export interface RVarProps {
  name: string;
  value: number | string | boolean | Record<string, string>;
  format?: string;
  type?: string;
}

export function RVar({ name, value, format, type }: RVarProps) {
  return e("r-var", {
    name,
    value,
    format,
    type,
  });
}
