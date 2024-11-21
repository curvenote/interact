import { RemixBrowser } from '@remix-run/react';
import { hydrateRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import store from './store';

hydrateRoot(
  document,
  <Provider store={store}>
    <RemixBrowser />
  </Provider>,
);
