import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

import {
    fetchCardData,
} from '../../../cardappapi/cardapp.api';

// Create the rootSaga generator function
function* cardRootSaga() {
    yield takeEvery('FETCH_CARDS', fetchAllCards);
  }

  function* fetchAllCards() {
    try {
      // Get the movies:
      //const moviesResponse = yield axios.get('/api/movies');
      const cardResponse = yield call(fetchCardData);
      console.log('cardResponse is', cardResponse);
      // Set the value of the movies reducer:
      yield put({
        type: 'SET_CARDS',
        payload: cardResponse.data
      });
    } catch (error) {
      console.log('fetchAllCards error:', error);
    }
  }

export default cardRootSaga;