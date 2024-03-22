import React, { useEffect } from 'react';
// import LogOutButton from '../LogOutButton/LogOutButton';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import CardList from '../CardList/CardList';

function UserPage() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  // const cards = useSelector(store => store.cards);

  useEffect(() => {
    dispatch({ type: 'FETCH_CARDS' });
  }, []);

  return (
    <div className="container">
      <div className="welcomeContainer">
        <h4>Welcome, {user.username}!</h4>
      </div>
      <div className="dashboardContainer">

      </div>
      {/* <p>Your ID is: {user.id}</p> */}
      {/* <LogOutButton className="btn" /> */}
      <div className="cardProgressContainer">
        {/* {cards.map(card => {
          return (
            <p key={card.id}>{card.cc_name}</p>
          );
        })} */}
        <CardList />
      </div>
      <div className="transactionFormContainer">

      </div>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
