import { SET_FINDER_OPEN, SET_NEEDLE, SET_PREVIEW_NEEDLE } from './constants';

export const setFinderOpen = (payload: boolean) => ({
  type: SET_FINDER_OPEN,
  payload,
});

export const setNeedle = (payload: string) => ({ type: SET_NEEDLE, payload });

export const setPreviewNeedle = (payload: string) => ({
  type: SET_PREVIEW_NEEDLE,
  payload,
});
