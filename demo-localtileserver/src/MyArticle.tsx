import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Notebook from "thebe-core/dist/notebook";
import {
  Output,
  MakePageLive,
  fetchNotebook,
  selectors,
  connect,
  RAction,
  RScope,
  RVar,
  RSelect,
  RDynamic,
} from "common";
import { AppDispatch } from "./store";
import "thebe-core/dist/index.css";
import { notebookData } from "./notebookData";

function MyArticle() {
  const dispatch = useDispatch<AppDispatch>();
  const notebookId = useSelector(selectors.getActiveNotebookId);

  useEffect(() => {
    dispatch(fetchNotebook(notebookData)).then((nb: Notebook) => {
      dispatch(connect.actions.setActiveNotebookId(nb.id));
    });
  }, []);

  return (
    <RScope name="page">
      <div style={{ position: "fixed", top: 0, left: 0, visibility: "hidden" }}>
        <RVar name="opacity" value={0.5} format=".1f"></RVar>
        <RVar name="zoom" value={2} format=".0f"></RVar>
        <RVar name="layer" value="methane" type="String"></RVar>
        <RVar name="colormap" value="plasma" type="String"></RVar>
      </div>
      <article className="centered">
        <MakePageLive
          notebookId={notebookId}
          repo="stevejpurves/earth-geo-data"
          branch="main"
        />
        <h1>
          Overlaying Global Raster Datasets with the{" "}
          <code>localtileserver</code>
        </h1>
        <Output notebookId={notebookId} cellId="cell-imports" />
        <p>
          This is an example of an explorable article using ipyleaflet with a
          localtileserver to produce maps with a raster based data overlay. We
          can adjust hte layers in use and other raster and map settings using
          in-text controls in the narative below.
        </p>
        {/* <h2>Global Annual Average Methane</h2>
        <p>About the dataset</p>
        <h2>Global Elevation Data</h2>
        <p>About the dataset</p> */}
        <h2>Exploring the data</h2>
        <p>
          We can make some adjustments. First change opacity for the current
          layer to{" "}
          <RDynamic
            bind="opacity"
            min={0.0}
            max={1.0}
            step={0.1}
            format=".1f"
          ></RDynamic>{" "}
          and also adjust the zoom level{" ("}
          <RDynamic
            bind="zoom"
            min={1}
            max={16}
            step={1}
            format=".0f"
          ></RDynamic>
          {") "}
          independently from map interaction in <code>ipyleaflet</code> a zoom
          level of <RAction bindToClick={'{"zoom": 1}'}>1</RAction> is all the
          way out while a zoom of{" "}
          <RAction bindToClick={'{"zoom": 16}'}>16</RAction> is pretty far in.
        </p>
        <p>
          Let's change some more discete settings - we have two raster map
          layers to choose from the first being{" "}
          <RAction bindToClick={'{"layer": "methane"}'}>
            Annual Average Methane
          </RAction>{" "}
          and the second being{" "}
          <RAction bindToClick={'{"layer": "elevation"}'}>
            Global Elevation Data
          </RAction>
          . We can chose to display either of these (currently we are looking at{" "}
          <RSelect
            bindToValue="layer"
            // bindToChange={"{layer: value}"}
            values={["methane", "elevation"]}
            labels={["Annual Average Methane", "Global Elevation"]}
          ></RSelect>
          ) and also pick which colormap we use to display the raster layer from
          one of these 👉🏻{" "}
          <RSelect
            bindToValue="colormap"
            bindToChange={"{colormap: value}"}
            values={["hot", "gray", "copper", "viridis", "viridis_r", "plasma"]}
            labels={[
              "Hot",
              "Gray",
              "Copper",
              "Viridis",
              "Viridis Reversed",
              "Plasma",
            ]}
          ></RSelect>{" "}
          .
        </p>
        <Output
          notebookId={notebookId}
          cellId="cell-show-map"
          placeholder={<img src="figure1.png" alt="composite signal" />}
        />
      </article>
    </RScope>
  );
}

export default MyArticle;
