

// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

// function InfoPage() {
//   return (
//     <div className="container">
//       <p>Info Page</p>
//     </div>
//   );
// }

// export default InfoPage;

import { useDispatch, useSelector } from 'react-redux';
import CardItem from '../CardItem/CardItem';
import React, { useEffect } from 'react';

function Completed( { refreshCardList } )  {
    const cards = useSelector(store => store.cards);
    const tranx = useSelector(store => store.tranx);
    const dispatch = useDispatch();
    console.log(cards)

    return (
        <div className="container">
            <div className="welcomeContainer">
                <h2>Completed Rewards</h2>
            </div>
            <div className='myCardsList'>
                {cards.map((card) => {
                    return (
                    tranx.filter((transact) => transact.card_id === card.id)
                    .reduce(
                        (cardspend, currentTranx) => cardspend+currentTranx.day_of_spend, 0
                    ) >= card.spend_goal &&
                    
                        <CardItem 
                            key={card.id} 
                            card={card}
                            refreshCardList={refreshCardList}
                            
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default Completed;
