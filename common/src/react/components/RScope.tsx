import { createElement as e } from "react";

export interface RScopeProps {
  name: string;
  children: JSX.Element[];
}

export function RScope({ name, children }: RScopeProps) {
  return e(
    "r-scope",
    {
      name,
    },
    children
  );
}
