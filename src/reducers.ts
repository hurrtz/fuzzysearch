import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from './utils/history';

export default (injectedReducers = {}) => {
  const rootReducer = combineReducers({
    router: connectRouter(history),
    ...injectedReducers,
  });

  return rootReducer;
};
