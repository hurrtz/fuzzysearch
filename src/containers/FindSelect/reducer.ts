import produce, { Draft } from 'immer';
import { AnyAction } from 'redux';
import { SET_FINDER_OPEN, SET_PREVIEW_NEEDLE, SET_NEEDLE } from './constants';

export interface State {
  finderOpen: boolean;
  previewNeedle: string;
  needle: string;
}

export const initialState: State = {
  finderOpen: false,
  previewNeedle: '',
  needle: '',
};

const homeReducer = (state = initialState, action: AnyAction) =>
  produce(state, (draft: Draft<State>) => {
    switch (action.type) {
      case SET_FINDER_OPEN:
        draft.finderOpen = action.payload;
        break;

      case SET_PREVIEW_NEEDLE:
        draft.previewNeedle = action.payload;
        break;

      case SET_NEEDLE:
        draft.needle = action.payload;
        break;

      default:
        return state;
    }
  });

export default homeReducer;
