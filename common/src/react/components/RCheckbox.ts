import { createElement as e } from "react";

export interface RCheckboxProps {
  bind?: string;
  bindToChange?: string;
  label: string;
  bindToLabel?: string;
  value?: boolean;
}

export function RCheckbox({
  bind,
  bindToChange,
  label,
  bindToLabel,
  value,
}: RCheckboxProps) {
  return e("r-checkbox", {
    bind,
    ["change"]: bindToChange,
    label,
    [":label"]: bindToLabel,
    value,
  });
}
