import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

import {
    fetchTranxData,
} from '../../../cardappapi/cardapp.api';

// Create the rootSaga generator function
function* tranxRootSaga() {
    yield takeEvery('FETCH_TRANX', fetchAllTranx);
}

function* fetchAllTranx(action) {
    try {
      // Get the movies:
      //const moviesResponse = yield axios.get('/api/movies');
      const tranxResponse = yield call(fetchTranxData);
      console.log('tranxResponse is', tranxResponse);
      // Set the value of the movies reducer:
      yield put({
        type: 'SET_TRANX',
        payload: tranxResponse.data
      });
    } catch (error) {
      console.log('fetchAllTranx error:', error);
    }
}

export default tranxRootSaga;