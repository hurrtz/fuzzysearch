import invariant from 'invariant';
import { isEmpty, isFunction, isString } from 'lodash';

import createReducer from '../reducers';
import { Store } from '../types';
import checkStore from './checkStore';

export function injectReducerFactory(store: Store, isValid: boolean) {
  return function injectReducer(key: string, reducer: Function) {
    if (!isValid) checkStore(store);

    invariant(
      isString(key) && !isEmpty(key) && isFunction(reducer),
      '(app/utils...) injectReducer: Expected `reducer` to be a reducer function',
    );

    if (
      Reflect.has(store.injectedReducers, key) &&
      store.injectedReducers[key] === reducer
    ) {
      return;
    }

    store.injectedReducers[key] = reducer;
    store.replaceReducer(createReducer(store.injectedReducers));
  };
}

export default function getInjectors(store: Store) {
  checkStore(store);

  return {
    injectReducer: injectReducerFactory(store, true),
  };
}
