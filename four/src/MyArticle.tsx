import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Notebook from "thebe-core/dist/notebook";
import { RScope, RDynamic, RVar } from "./connect/react/components";
import Output from "./connect/react/Output";
import { AppDispatch } from "./store";
import { fetchNotebook, selectors, connect } from "./connect/redux";
import "thebe-core/dist/index.css";
import JustMakePageLive from "./connect/react/JustMakePageLive";
import RAction from "./connect/react/components/RAction";

function MyArticle() {
  const dispatch = useDispatch<AppDispatch>();
  const notebookId = useSelector(selectors.getActiveNotebookId);

  useEffect(() => {
    dispatch(fetchNotebook()).then((nb: Notebook) => {
      dispatch(connect.actions.setActiveNotebookId(nb.id));
    });
  }, []);

  return (
    <RScope name="page">
      <div style={{ position: "fixed", top: 0, left: 0, visibility: "hidden" }}>
        <RVar name="place" value="" type="String"></RVar>
        <RVar name="zoom" value={12} format=".0f"></RVar>
      </div>
      <article className="centered">
        <JustMakePageLive notebookId={notebookId} local />
        <h1>Telling a story with maps</h1>
        <p>
          A small example to show in test controls liked to a map. In lieu of
          adding localtileserver layers.
        </p>
        <p>Btw not this kind of map 👇 </p>
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
          cellId="curvenote-cell-id-4"
          placeholder={<img src="figure1.png" alt="composite signal" />}
        />
        <p>
          The Capital city of the island bears the same name as the province{" "}
          <RAction bindToClick={'{ "place": "santa_cruz" }'}>
            Santa Cruz de Tenerife
          </RAction>{" "}
          and the largest center of population on the island with many shopping,
          leisure and cultural attractions.
        </p>
        <p>
          The highest point on the island is the{" "}
          <RAction bindToClick={'{ "place": "pico_tiede" }'}>
            peak of Mount Tiede
          </RAction>{" "}
          also the highest mountain in Spain. The mountain sits in a wide
          caldera itself at over 2000m altitude and a National Park, zoom out (
          <RDynamic
            bind="zoom"
            min={6}
            max={16}
            step={1}
            format=".0f"
          ></RDynamic>
          ) to see extent of the Caldera.
        </p>
        <p>
          Finally jump to the north of the island to the town of{" "}
          <RAction bindToClick={'{ "place": "orotava" }'}>La Orotava</RAction> .
          Previously, a capital of the north of the island, this town, perched
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
