import React from "react";
import "./App.css";
import { setupThebeCore } from "thebe-core";
import { store } from "./store";
import "@curvenote/article/dist/curvenote.css";
import "./styles.css";

import { Provider } from "react-redux";
import MyArticle from "./MyArticle";

setupThebeCore(store, true);

// TODO get off jsapi & get actions in place
window.thebe_core.api.configure({
  useBinder: true,
  requestKernel: false,
});

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <MyArticle />
      </div>
    </Provider>
  );
}

export default App;
