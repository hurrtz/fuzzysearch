import produce, { Draft } from 'immer';
import { AnyAction } from 'redux';
import {
  SET_FINDER_OPEN,
  SET_PREVIEW_NEEDLE,
  SET_NEEDLE,
  SET_SELECTED_INDEX,
  SET_RESULTS,
  SET_RESULT,
} from './constants';

export interface State {
  finderOpen: boolean;
  previewNeedle: string;
  needle: string;
  selectedIndex?: number;
  results: string[];
  result: string;
}

export const initialState: State = {
  finderOpen: false,
  previewNeedle: '',
  needle: '',
  selectedIndex: undefined,
  results: [],
  result: '',
};

const handleChangeSelectedIndex = (
  results: State['results'],
  currentIndex: State['selectedIndex'],
  index?: number,
) => {
  if (index === undefined) {
    return undefined;
  }

  if (index > 0) {
    if (currentIndex === undefined) {
      return 0;
    }

    return Math.min((currentIndex || 0) + 1, results.length - 1);
  }

  if (index < 0) {
    return Math.max((currentIndex || 0) - 1, 0);
  }
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
        const previewIndex = handleChangeSelectedIndex(
          draft.results,
          draft.selectedIndex,
          action.payload,
        );
        draft.selectedIndex = previewIndex;
        draft.previewNeedle =
          previewIndex !== undefined
            ? draft.results[previewIndex]
            : draft.previewNeedle;
        break;

      case SET_RESULTS:
        draft.results = action.payload;
        break;

      case SET_RESULT:
        draft.finderOpen = false;
        draft.previewNeedle = '';
        draft.needle = '';
        draft.selectedIndex = undefined;
        draft.result = action.payload;
        break;

      default:
        return state;
    }
  });

export default homeReducer;
