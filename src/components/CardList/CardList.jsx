import { useSelector } from 'react-redux';
import CardItem from '../CardItem/CardItem';
import React, { useEffect } from 'react';


function CardList()  {
    // Same State Element
    // const elementList = useSelector((state) => state.elementList);
    const cards = useSelector(store => store.cards);
    //const isLoading = useSelector((store) => store.isLoadingCards);

    return (
        <div className='myCardsList'>
            {cards.map((listCards, cardIndex) => {
                return (
                    <CardItem 
                        key={cardIndex} 
                        card={listCards}
                    />
                )
            })}
        </div>
    )
}

export default CardList;