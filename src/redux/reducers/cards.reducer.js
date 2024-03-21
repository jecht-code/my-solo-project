import { combineReducers } from 'redux';

// Used to store movies returned from the server
const cardsReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_CARDS':
        return action.payload;
      default:
        return state;
    }
  }

  export default cardsReducer;