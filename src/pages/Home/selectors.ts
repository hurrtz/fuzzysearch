import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { NS } from './constants';

const selectHome = (state: any) => state[NS] || initialState;

const makeSelectFruits = () =>
  createSelector(selectHome, (home) => home.fruits);

export { makeSelectFruits };
