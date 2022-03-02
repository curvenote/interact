import { CodeBlock } from "./connect/redux/actions";

export const CURVENOTE_MIMETYPE = "application/vnd.jupyter.curvenote-view+json";

export const notebookDataSeparated: CodeBlock[] = [
  {
    id: "cell-imports",
    source: `
from ipyleaflet import Map
from ipython.display import display
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
print(center, zoom)
CURVENOTE_MIMETYPE = "application/vnd.jupyter.curvenote-view+json"
print(CURVENOTE_MIMETYPE)
display({CURVENOTE_MIMETYPE: dict(center=center, zoom=zoom)}, raw=True)
m = Map(center=center, zoom=zoom)
m
`,
  },
];

export const notebookData: CodeBlock[] = [
  {
    id: "cell-imports",
    source: `
from ipyleaflet import Map
from ipython.display import display
`,
  },
  {
    id: "cell-define-places",
    source: `places = dict(
  orotava=dict(center=(28.389216, -16.520283)),
  pico_tiede=dict(center=(28.272401, -16.642457)),
  santa_cruz=dict(center=(28.466965, -16.249938))
)`,
  },
  {
    id: "cell-set-place",
    source: `
place = None # @param
zoom = 7 # @param
center = places[place]["center"] if place is not None else (28.586850, -15.648742)
`,
  },
  {
    id: "cell-show-map",
    source: `
CURVENOTE_MIMETYPE = "application/vnd.jupyter.curvenote-view+json"
display({CURVENOTE_MIMETYPE: dict(center=center, zoom=zoom)}, raw=True)
m = Map(center=center, zoom=zoom)
m
`,
  },
];
