import React from "react";
import "./App.css";
import { setupThebeCore } from "thebe-core";
import { store } from "./store";
import "@curvenote/article/dist/curvenote.css";
import "./styles.css";

import { Provider } from "react-redux";
import MyArticle from "./MyArticle";

setupThebeCore(store);

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
