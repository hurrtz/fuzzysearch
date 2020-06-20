export interface Store {
  dispatch: Function;
  subscribe: Function;
  getState: Function;
  replaceReducer: Function;
  runSaga: Function;
  injectedReducers: {
    [name: string]: any;
  };
  injectedSagas: {
    [name: string]: any;
  };
}
