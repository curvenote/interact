import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import KernelControl from "./KernelControl";
import Output from "./Output";
import { fetchNotebook } from "./store/actions";

function MyArticle() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNotebook());
  }, []);

  return (
    <article>
      <KernelControl />
      <h1>Fourier Series</h1>
      <p>
        Fourier series (and the related Fourier Transforms, more on those in
        another article!) are powerful funciton and signal representations,
        capable of representing completely any periodic bandlimited signal.
        Understanding the representation can be tricky, but is greatly helped by
        visualising individual components of the series, which is what we'll do
        here.
      </p>
      <h2>An Example</h2>
      <p>TODO some maths!</p>
      <h2>The Series Components</h2>
      <p>Explanation of the series and adding some controls</p>
      <Output cellId="curvenote-cell-id-5" />
      <h2>The Composite Signal</h2>
      <Output cellId="curvenote-cell-id-6" />
      <h2>The Coefficients</h2>
      <Output cellId="curvenote-cell-id-4" />
    </article>
  );
}

export default MyArticle;
