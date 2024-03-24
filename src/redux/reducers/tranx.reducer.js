import { combineReducers } from 'redux';

// Used to store movies returned from the server
const tranxReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_TRANX':
        return action.payload;
      default:
        return state;
    }
  }

  export default tranxReducer;