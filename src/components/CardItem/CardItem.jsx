import axios from 'axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

function CardItem ({ card }) {
    const dispatch = useDispatch();
    
    const cardHandleClickDelete = () => {
        console.log('DELETE', card.id);
        axios
            .delete(`/api/card/${card.id}`)
            .then((response) => {
                //refreshCardList();
            })
            .catch((error) => {
                console.log('ERROR:', error);
            });
    };

    return (
        <div>
            <p key={card.id}>
                {card.cc_name}
            </p>
            <button onClick={cardHandleClickDelete}>DELETE</button>
        </div>
    )
}

export default CardItem;