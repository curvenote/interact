import { createElement as e } from "react";

export interface RRangeProps {
  bind: string;
  value?: number;
  min?: number;
  max?: number;
  step?: number;
}

export function RRange({ bind, value, min, max, step }: RRangeProps) {
  return e("r-range", { bind, value, min, max, step });
}
