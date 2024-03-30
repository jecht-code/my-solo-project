import React, { useEffect } from 'react';
import { Route, HashRouter as Router } from 'react-router-dom';
// import LogOutButton from '../LogOutButton/LogOutButton';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import CardList from '../CardList/CardList';
import SummaryBlock from '../SummaryWidget/SummaryBlock';
import TranxForm from '../TranxForm/TranxForm';
import CardDetailPage from '../CardDetailPage/CardDetailPage';
import axios from 'axios';

import {
  fetchCardData,
} from '../../../cardappapi/cardapp.api';

function UserPage() {
  const user = useSelector((store) => store.user);
  const tranx = useSelector((store) => store.tranx);
  const cards = useSelector((store) => store.cards);
  const dispatch = useDispatch();
  // const cards = useSelector(store => store.cards);

  // const totalcards = cards.length

  const fetchCardList = () => {
    axios
      .get(fetchCardData)
      .then((response) => {
        dispatch({ type: 'FETCH_CARDS', payload: response.data })
      })
      .catch((error) => {
        console.log('ERROR', error);
      });
  };

  useEffect(() => {
    fetchCardList();
    dispatch({ type: 'FETCH_CARDS' });
    //dispatch({type: 'FETCH_TRANX', payload: user.id })
    dispatch({ type: 'FETCH_TRANX' });
  }, []);

  return (
    <div className="container">
      <div className="welcomeContainer">
        <h4>Welcome, {user.username}!</h4>
        {/* <h4>{JSON.stringify(user)}</h4>
        <h4>total cards: {totalcards}</h4> */}
      </div>
      <div className="dashboardContainer">
        <SummaryBlock />
      </div>
      {/* <p>Your ID is: {user.id}</p> */}
      {/* <LogOutButton className="btn" /> */}
      <div className="cardProgressContainer">
        {/* {cards.map(card => {
          return (
            <p key={card.id}>{card.cc_name}</p>
          );
        })} */}
        <CardList refreshCardList={fetchCardList} />
      </div>
      <div className="transactionFormContainer">
        <TranxForm />
      </div>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
