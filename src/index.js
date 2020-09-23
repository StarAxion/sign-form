import React, { StrictMode } from 'react';
import { render } from 'react-dom';
import './styles/index.css';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './components/App';

render(
  <Provider store={store}>
    <StrictMode>
      <App />
    </StrictMode>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
