import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from './utils/history';
import globalReducer from './pages/Home/reducer';

export default (injectedReducers = {}) => {
  const rootReducer = combineReducers({
    global: globalReducer,
    router: connectRouter(history),
    ...injectedReducers,
  });

  return rootReducer;
};
