import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Notebook from "thebe-core/dist/notebook";
import {
  Output,
  JustMakePageLive,
  fetchNotebook,
  selectors,
  connect,
} from "common";
import { RScope, RVar, RDynamic, RAction } from "common/dist/react/components";
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
        <RVar name="place" value="" type="String"></RVar>
        <RVar name="zoom" value={7} format=".0f"></RVar>
      </div>
      <article className="centered">
        <JustMakePageLive notebookId={notebookId} local />
        <h1>Telling a story with maps</h1>
        <p>A small example to show in text controls linked to a map.</p>
        <p>By the way, not this kind of map 👇 </p>
        {"$$f: X \\rightarrow Y (1)$$"}
        <h2>Tenerife in the Canary Islands</h2>
        <p>
          Using leafletjs lets explore Tenerife! There are many things to see
          but let us start zoomed out. Tenerife is one of the Western Canary
          Islands forming the Province of Santa Cruz de Tenerife as a group with
          La Gomera, El Hierro and La Palma.
        </p>
        <Output
          notebookId={notebookId}
          cellId="cell-show-map"
          placeholder={<img src="figure1.png" alt="composite signal" />}
        />
        <p>
          The Capital city of the island bears the same name as the province{" "}
          <RAction bindToClick={'{ "place": "santa_cruz", "zoom": 14 }'}>
            Santa Cruz de Tenerife
          </RAction>{" "}
          and the largest center of population on the island with many shopping,
          leisure and cultural attractions.
        </p>
        <p>
          The highest point on the island is the{" "}
          <RAction bindToClick={'{ "place": "pico_tiede", "zoom": 14 }'}>
            peak of Mount Tiede
          </RAction>{" "}
          also the highest mountain in Spain. The mountain sits in a wide
          caldera itself at over 2000m altitude and a National Park, zoom out (
          <RDynamic
            bind="zoom"
            min={1}
            max={16}
            step={1}
            format=".0f"
          ></RDynamic>
          ) to see extent of the Caldera.
        </p>
        <p>
          Finally jump to the north of the island to the town of{" "}
          <RAction bindToClick={'{ "place": "orotava", "zoom": 14 }'}>
            La Orotava
          </RAction>{" "}
          . Previously, a capital of the north of the island, this town, perched
          on a ancient graviational collapse, is full of collonial architecture,
          culture and a great stop for chocolate y churros in winter.
        </p>
        <p>
          Learn more about Tenerife and the other Canary islands from the
          offical touriam web portal -{" "}
          <a href="https://www.hellocanaryislands.com/tenerife/">
            Hello Canary Islands!
          </a>
        </p>
      </article>
    </RScope>
  );
}

export default MyArticle;
