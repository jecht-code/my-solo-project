import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

import {
    fetchTranxData,
} from '../../../cardappapi/cardapp.api';

// Create the rootSaga generator function
function* tranxRootSaga() {
    yield takeEvery('FETCH_TRANX', fetchAllTranx);
    yield takeEvery('DELETE_TRANX', deleteTranxSaga);
    yield takeEvery('UPDATE_TRANX', updateTranxSaga);
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

function* deleteTranxSaga(action) {
  try {
    yield axios({
      method: 'DELETE',
      url: `/api/tranx/${action.payload.id}`,
    });
    yield put({ type: 'FETCH_TRANX' });
  } catch (error) {
    yield put({
      type: 'ERROR_TRANX',
      payload: 'Could not delete the transaction. Please Try Again.'
    });
  }
};

function* updateTranxSaga(action) {
  try {
    yield axios({
      method: 'PUT',
      url: `/api/tranx/${action.payload.id}`,
      data: action.payload,
    });
    yield put({ type: 'FETCH_TRANX' });
  } catch (error) {
    yield put({
      type: 'ERROR_TRANX',
      payload: 'Could not delete the transaction. Please Try Again.'
    });
  }
};

export default tranxRootSaga;