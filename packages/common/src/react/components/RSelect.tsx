import { createElement as e } from "react";

export interface RSelectProps {
  bindToValue: string;
  bindToChange: string;
  values: string[];
  labels: string[];
}

export function RSelect({
  bindToValue,
  bindToChange,
  values,
  labels,
}: RSelectProps) {
  return e("r-select", {
    ":value": bindToValue,
    ":change": bindToChange,
    values: values.join(","),
    labels: labels.join(","),
  });
}
