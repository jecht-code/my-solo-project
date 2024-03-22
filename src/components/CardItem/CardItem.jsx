import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

function CardItem ({ card }) {
    const dispatch = useDispatch();
    
    const cardHandleClickDelete = () => {

    };

    return (
        <div>
            <p key={card.id}>
                {card.cc_name}
            </p>
        </div>
    )
}

export default CardItem;