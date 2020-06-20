import { put, takeLatest, delay } from 'redux-saga/effects';
import axios from 'axios';
import { uniq } from 'lodash';

import { State } from './reducer';
import { FETCH_FRUITS } from './constants';
import { setFruits } from './actions';

export function* fetchFruits() {
  const DELAY_MIN = 1250;
  const DELAY_MAX = 2500;
  const DELAY = Math.floor(Math.random() * (DELAY_MAX - DELAY_MIN) + DELAY_MIN);

  yield delay(DELAY);

  const response = yield axios.get('/data.json');

  if (response && response.statusText === 'OK') {
    const _fetchedFruits = uniq(response.data.fruits) as State['fruits'];
    const fetchedFruits = _fetchedFruits.sort();

    yield put(setFruits(fetchedFruits));
  }
}

export default function* homeSaga() {
  yield takeLatest(FETCH_FRUITS, fetchFruits);
}
