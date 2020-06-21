import {
  SET_FINDER_OPEN,
  SET_NEEDLE,
  SET_PREVIEW_NEEDLE,
  SET_SELECTED_INDEX,
  SET_RESULTS,
} from './constants';

export const setFinderOpen = (payload: boolean) => ({
  type: SET_FINDER_OPEN,
  payload,
});

export const setNeedle = (payload: string) => ({ type: SET_NEEDLE, payload });

export const setPreviewNeedle = (payload: string) => ({
  type: SET_PREVIEW_NEEDLE,
  payload,
});

export const setResults = (payload: string[]) => ({
  type: SET_RESULTS,
  payload,
});

export const setSelectedIndex = (payload: number) => ({
  type: SET_SELECTED_INDEX,
  payload,
});
