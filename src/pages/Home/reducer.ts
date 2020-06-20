import { AnyAction } from 'redux';

export default (state = {}, action: AnyAction) => {
  switch (action.type) {
    default:
      return state;
  }
};
