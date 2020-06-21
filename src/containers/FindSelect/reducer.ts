import produce, { Draft } from 'immer';
import { AnyAction } from 'redux';
import {
  SET_FINDER_OPEN,
  SET_PREVIEW_NEEDLE,
  SET_NEEDLE,
  SET_SELECTED_INDEX,
  SET_RESULTS,
} from './constants';

export interface State {
  finderOpen: boolean;
  previewNeedle: string;
  needle: string;
  selectedIndex: number;
  results: string[];
}

export const initialState: State = {
  finderOpen: false,
  previewNeedle: '',
  needle: '',
  selectedIndex: -1,
  results: [],
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

      case SET_SELECTED_INDEX:
        draft.selectedIndex = action.payload;
        break;

      case SET_RESULTS:
        draft.results = action.payload;
        break;

      default:
        return state;
    }
  });

export default homeReducer;
