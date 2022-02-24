import { CodeBlock } from "./connect/redux/actions";

export const notebookData: CodeBlock[] = [
  {
    id: "curvenote-cell-id-1",
    source: `
from localtileserver import examples, get_leaflet_tile_layer, TileClient
from ipyleaflet import Map
`,
  },
  {
    id: "curvenote-cell-id-2",
    source: `
# First, create a tile server from local raster file
# bahamas = TileClient('bahamas_rgb.tif')`,
  },
  {
    id: "curvenote-cell-id-3",
    source: `
# Collect common parameters
zoom = 8 # @param
place = None # @param`,
  },
  {
    id: "curvenote-cell-id-4",
    source: `
# Create ipyleaflet tile layer from that server
# bahamas_layer = get_leaflet_tile_layer(bahamas)

places = dict(
    orotava=dict(center=(28.389216, -16.520283), zoom=12),
    pico_tiede=dict(center=(28.272401, -16.642457), zoom=12),
    santa_cruz=dict(center=(28.466965, -16.249938), zoom=12)
)

center = places[place]["center"] if place is not None else (28.586850, -15.648742)
zoom = places[place]["zoom"] if place is not None else zoom

# Create ipyleaflet map, add layers, add controls, and display
m = Map(center=center, zoom=zoom)
# m.add_layer(bahamas_layer)
m
`,
  },
];
