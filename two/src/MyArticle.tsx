import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Notebook from "thebe-core/dist/notebook";
import { RScope } from "./components";
import RDisplay from "./components/RDisplay";
import RDynamic from "./components/RDynamic";
import RVar from "./components/RVar";
import Output from "./Output";
import { AppDispatch, selectors } from "./store";
import actions, { fetchNotebook } from "./store/actions";
import "thebe-core/dist/index.css";
import JustMakePageLive from "./JustMakePageLive";

function MyArticle() {
  const dispatch = useDispatch<AppDispatch>();
  const notebookId = useSelector(selectors.compute.getActiveNotebookId);

  useEffect(() => {
    dispatch(fetchNotebook()).then((nb: Notebook) => {
      dispatch(actions.compute.setActiveNotebookId(nb.id));
    });
  }, []);

  return (
    <RScope name="page">
      <RVar name="wo" value={0.5} format=".2f"></RVar>
      <article className="centered">
        <JustMakePageLive notebookId={notebookId} />
        {/* <KernelControl /> */}
        {/* <MakeLive notebookId={notebookId} /> */}
        <h1>Fourier Series</h1>
        <p>
          Fourier series (and the related Fourier Transforms, more on those in
          another article!) are powerful funciton and signal representations,
          capable of representing completely any periodic bandlimited signal.
          Understanding the representation can be tricky, but is greatly helped
          by visualising individual components of the series, which is what
          we'll do here.
        </p>
        <h2>An Example</h2>
        <p>TODO some maths!</p>
        <p>
          Given that <em>wo</em> is{" "}
          <RDisplay bindToValue="wo" format=".2f"></RDisplay> and I can change
          its value{" "}
          <RDynamic
            bind="wo"
            min={0.01}
            max={0.5}
            step={0.01}
            format=".2f"
          ></RDynamic>
        </p>
        <h2>The Series Components</h2>
        <p>Explanation of the series and adding some controls</p>
        <Output
          notebookId={notebookId}
          cellId="curvenote-cell-id-5"
          placeholder={<img src="components.png" alt="fourier components" />}
        />
        <h2>The Composite Signal</h2>
        <Output
          notebookId={notebookId}
          cellId="curvenote-cell-id-6"
          placeholder={<img src="composite.png" alt="composite signal" />}
        />
        <h2>The Coefficients</h2>
        <Output
          notebookId={notebookId}
          cellId="curvenote-cell-id-4"
          placeholder={
            <img src="coefficients.png" alt="fourier series coefficients" />
          }
        />
      </article>
    </RScope>
  );
}

export default MyArticle;
