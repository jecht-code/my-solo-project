import { useDispatch, useSelector } from 'react-redux';
import CardItem from '../CardItem/CardItem';
import React, { useEffect } from 'react';


function CardList( { refreshCardList } )  {
    const cards = useSelector(store => store.cards);
    const dispatch = useDispatch();
    console.log(cards)

    return (
        <div className='myCardsList'>
            {cards.map((card) => {
                return (
                    <CardItem 
                        key={card.id} 
                        card={card}
                        refreshCardList={refreshCardList}
                        
                    />
                )
            })}
        </div>
    )
}

export default CardList;