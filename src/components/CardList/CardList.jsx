import { useSelector } from 'react-redux';
import CardItem from '../CardItem/CardItem';
import React, { useEffect } from 'react';


function CardList( { refreshCardList } )  {
    const cards = useSelector(store => store.cards);

    return (
        <div className='myCardsList'>
            {cards.map((listCards) => {
                return (
                    <CardItem 
                        key={listCards.id} 
                        card={listCards}
                        refreshCardList={refreshCardList}
                    />
                )
            })}
        </div>
    )
}

export default CardList;