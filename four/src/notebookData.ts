import { CodeBlock } from "./connect/redux/actions";

export const notebookData: CodeBlock[] = [
  {
    id: "cell-imports",
    source: `
from ipyleaflet import Map
`,
  },
  {
    id: "cell-define-places",
    source: `places = dict(
  orotava=dict(center=(28.389216, -16.520283), zoom=12),
  pico_tiede=dict(center=(28.272401, -16.642457), zoom=12),
  santa_cruz=dict(center=(28.466965, -16.249938), zoom=12)
)`,
  },
  {
    id: "cell-set-place",
    source: `place = None # @param
center = places[place]["center"] if place is not None else (28.586850, -15.648742)
zoom = places[place]["zoom"] if place is not None else zoom
`,
  },
  {
    id: "cell-set-zoom",
    source: `
      # Collect common parameters
      zoom = 7 # @param
    `,
  },
  {
    id: "cell-show-map",
    source: `
m = Map(center=center, zoom=zoom)
m
`,
  },
];
