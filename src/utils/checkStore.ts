import { conformsTo, isFunction, isObject } from 'lodash';
import invariant from 'invariant';

import { Store } from '../types';

export default function checkStore(store: Store) {
  const shape = {
    dispatch: isFunction,
    subscribe: isFunction,
    getState: isFunction,
    replaceReducer: isFunction,
    runSaga: isFunction,
    injectedReducers: isObject,
    injectedSagas: isObject,
  };

  invariant(
    conformsTo(store, shape),
    '(app/utils...) injectors: Expected a valid redux store',
  );
}
