import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectHome = (state: any) => state.HOME || initialState;

const makeSelectFruits = () =>
  createSelector(selectHome, (home) => home.fruits);

export { makeSelectFruits };
