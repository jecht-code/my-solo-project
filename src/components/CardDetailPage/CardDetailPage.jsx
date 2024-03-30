import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

function CardDetailPage() {
    const history = useHistory();
    const location = useLocation();
    console.log(location);
    const card = history.location.state;
    console.log(card);
    const tranx = useSelector((store) => store.tranx);
    console.log(tranx);
    console.log('Transact ID', tranx.card_id);
    console.log('card ID', card.id);
    //This would be card id becaues depending on which card you select..
    const transactions = tranx.filter((transact) => transact.card_id === card.id)

    console.log(transactions)

    const handleBackTo = () => {
        history.push({ pathname: '/user', state: card })
        console.log({history})
    }
  
    return (
    
      <div data-testid='CardDetailsPage'>
        <h1>DetailsPage</h1>
        <h2>{card.cc_name}</h2>
        <p>card id = {card.id}</p>
        <p>{card.rewards_value}</p>
        <button data-testid='toList' onClick={() => handleBackTo()}>Return to List</button>
      </div>
    );
  }

export default CardDetailPage;