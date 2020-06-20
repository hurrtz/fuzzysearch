import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { NS } from './constants';

const selectFindSelect = (state: any) => state[NS] || initialState;

const makeSelectFinderOpen = () =>
  createSelector(selectFindSelect, (findSelect) => findSelect.finderOpen);

const makeSelectNeedle = () =>
  createSelector(selectFindSelect, (findSelect) => findSelect.needle);

const makeSelectPreviewNeedle = () =>
  createSelector(selectFindSelect, (findSelect) => findSelect.previewNeedle);

export { makeSelectFinderOpen, makeSelectPreviewNeedle, makeSelectNeedle };
