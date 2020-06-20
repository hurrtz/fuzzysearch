import produce, { Draft } from 'immer';
import { AnyAction } from 'redux';
import { SET_FRUITS } from './constants';

export interface State {
  fruits: string[];
}

export const initialState: State = {
  fruits: [],
};

const homeReducer = (state = initialState, action: AnyAction) =>
  produce(state, (draft: Draft<State>) => {
    switch (action.type) {
      case SET_FRUITS:
        draft.fruits = action.payload;
        break;
    }
  });

export default homeReducer;
