import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import { History } from 'history';
import createReducer from './reducers';

export default function configureStore(initialState = {}, history: History) {
  let composeEnhancers = compose;
  const reduxSagaMonitorOptions = {};

  if (process.env.NODE_ENV !== 'production' && typeof window === 'object') {
    // @ts-ignore-next-line
    if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
      // @ts-ignore-next-line
      composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({});
  }

  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);

  const middlewares = [sagaMiddleware, routerMiddleware(history)];

  const enhancers = [applyMiddleware(...middlewares)];

  const store = createStore(
    createReducer(),
    initialState,
    composeEnhancers(...enhancers),
  );

  // @ts-ignore-next-line
  store.runSaga = sagaMiddleware.run;

  // @ts-ignore-next-line
  store.injectedReducers = {};

  // @ts-ignore-next-line
  store.injectedSagas = {};

  // @ts-ignore-next-line
  if (module.hot) {
    // @ts-ignore-next-line
    module.hot.accept('./reducers', () => {
      // @ts-ignore-next-line

      store.replaceReducer(createReducer(store.injectedReducers));
    });
  }

  return store;
}
