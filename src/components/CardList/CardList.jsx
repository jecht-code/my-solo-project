import { useDispatch, useSelector } from 'react-redux';
import CardItem from '../CardItem/CardItem';
import React, { useEffect } from 'react';


function CardList( { refreshCardList } )  {
    const cards = useSelector(store => store.cards);
    const tranx = useSelector(store => store.tranx);
    const dispatch = useDispatch();
    console.log(cards)

    return (
        <section>
            <div className='myCardsList'>
                <h4>List of Cards</h4>
                {cards.map((card) => {
                    return (
                    tranx.filter((transact) => transact.card_id === card.id)
                    .reduce(
                        (cardspend, currentTranx) => cardspend+currentTranx.day_of_spend, 0
                    ) < card.spend_goal &&
                    
                        <CardItem 
                            key={card.id} 
                            card={card}
                            refreshCardList={refreshCardList}
                            
                        />
                    )
                })}
            </div>
        </section>
    )
}

export default CardList;