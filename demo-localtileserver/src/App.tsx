import React from "react";
import "./App.css";
import { setupThebeCore } from "thebe-core";
import { store } from "./store";
import "@curvenote/article/dist/curvenote.css";
import { RequireJsWarning } from "common";
import "common/dist/styles.css";

import { Provider } from "react-redux";
import MyArticle from "./MyArticle";

setupThebeCore(store, true);

// REQUIREJS: divert any local requirejs requests onto a specific route
// we could then add a router or otherwise ensure that the `/require` route 404s
if (window.requirejs) {
  window.requirejs.config({
    baseUrl: "/require",
  });
}

// TODO: can use a mechnism like this to preload widgets if desired
if (window.define) {
  window.define("require/jupyter-leaflet", { some: "amd module" });
}

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <RequireJsWarning />
        <MyArticle />
      </div>
    </Provider>
  );
}

export default App;
