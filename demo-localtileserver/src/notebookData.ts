import { CodeBlock } from "common";

export const CURVENOTE_MIMETYPE = "application/vnd.jupyter.curvenote-view+json";

export const notebookData: CodeBlock[] = [
  {
    id: "cell-imports",
    source: `import os
try:
    os.environ['LOCALTILESERVER_CLIENT_PREFIX'] = f"{os.environ['JUPYTERHUB_SERVICE_PREFIX']}/proxy/{{port}}"
except:
    pass
from localtileserver import examples, get_leaflet_tile_layer, TileClient, examples
from ipyleaflet import Map, LayersControl
from ipywidgets import Layout
`,
  },
  {
    id: "cell-tile-clients",
    source: `methane = TileClient('2016Averageppb.tif')
elevation = examples.get_elevation()`,
  },
  {
    id: "cell-set-params",
    source: `opacity = 0.5 # @param
layer = 'methane' # @param
colormap = 'plasma' # @param
zoom = 1 # @param
`,
  },
  {
    id: "cell-make-layers",
    source: `methane_layer = get_leaflet_tile_layer(methane, name='Annual Average Methane', palette=colormap, opacity=opacity)
elevation_layer = get_leaflet_tile_layer(elevation, name='Global Elevation Data',
                           band=1, vmin=-500, vmax=5000,
                           palette=colormap,
                           opacity=opacity)
    `,
  },
  {
    id: "cell-show-map",
    source: `
print(f"Zoom: {zoom} | Opacity: {opacity} | Layer: {layer} | Colormap: {colormap}")

from localtileserver import examples, get_leaflet_tile_layer, TileClient, examples
from ipyleaflet import Map, LayersControl
from ipywidgets import Layout

methane_layer = get_leaflet_tile_layer(methane, name='Annual Average Methane', palette=colormap, opacity=opacity)
elevation_layer = get_leaflet_tile_layer(elevation, name='Global Elevation Data',
                           band=1, vmin=-500, vmax=5000,
                           palette=colormap,
                           opacity=opacity)

if layer == 'elevation':
    data_layer = elevation_layer
    data_center = elevation.center()      
else:
    data_layer = methane_layer
    data_center = methane.center()

# Create ipyleaflet map, add layers, add controls, and display
m = Map(center=data_center, zoom=zoom, layout=Layout(height='800px'))

if layer == 'elevation':
    m.add_layer(elevation_layer)
else:
    m.add_layer(methane_layer)

control = LayersControl(position='topright')
m.add_control(control)
m
`,
  },
];
