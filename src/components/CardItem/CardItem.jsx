import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

function CardItem ({ card, refreshCardList }) {
    const dispatch = useDispatch();
    const history = useHistory();
    
    useEffect(() => {
        dispatch({ type: 'FETCH_CARDS'});
    }, []);

    const cardHandleClickDelete = () => {
        console.log('DELETE', card.id);
        axios
            .delete(`/api/card/${card.id}`)
            .then((response) => {
                refreshCardList();
            })
            .catch((error) => {
                console.log('ERROR:', error);
            });
    };

    const handleCarditem = (card) => {
        history.push({ pathname: '/detailspage', state: card })   
    }

    return (
        <div>
            <p key={card.id}>
                {card.cc_name}
            </p>
            <button onClick={cardHandleClickDelete}>DELETE</button>
            <button onClick={() => handleCarditem(card)}>Details Page</button>
        </div>
    )
}

export default CardItem;