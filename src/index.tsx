import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import history from './utils/history';
import configureStore from './store';
import './index.css';
import theme from './theme';
import Home from './pages/Home';

const initialState = {};
const store = configureStore(initialState, history);

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <ConnectedRouter history={history}>
        <CssBaseline />
        <Home />
      </ConnectedRouter>
    </ThemeProvider>
  </Provider>,
  document.getElementById('root'),
);
