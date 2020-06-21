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

const makeSelectResults = () =>
  createSelector(selectFindSelect, (findSelect) => findSelect.results);

const makeSelectSelectedIndex = () =>
  createSelector(selectFindSelect, (findSelect) => findSelect.selectedIndex);

const makeSelectResult = () =>
  createSelector(selectFindSelect, (findSelect) => findSelect.result);

export {
  makeSelectFinderOpen,
  makeSelectPreviewNeedle,
  makeSelectNeedle,
  makeSelectResults,
  makeSelectSelectedIndex,
  makeSelectResult,
};
