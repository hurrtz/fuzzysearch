import { AnyAction } from 'redux';
import { FETCH_FRUITS, SET_FRUITS } from './constants';

export const fetchFruits = (): AnyAction => ({
  type: FETCH_FRUITS,
});

export const setFruits = (payload: string[]): AnyAction => ({
  type: SET_FRUITS,
  payload,
});
