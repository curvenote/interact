import React from 'react';
import './App.css';
import { setupThebeRedux } from 'thebe-redux';
import { store } from './store';

import '@curvenote/article/dist/curvenote.css';
import 'common/dist/styles.css';
import 'thebe-core/dist/index.css';

import { Provider } from 'react-redux';
import MyArticle from './MyArticle';

setupThebeRedux();

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
