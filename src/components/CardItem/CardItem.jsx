import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function CardItem ({ card, refreshCardList }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const tranx = useSelector((store) => store.tranx);
    
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

        // axios
        //     .delete(`/api/tranxcard/${card.id}`)
        //     .then((response) => {
        //         //refreshCardList();
        //     })
        //     .catch((error) => {
        //         console.log('ERROR:', error);
        //     });
    };

    const handleCarditem = (card) => {
        history.push({ pathname: '/detailspage', state: card })   
    }

    console.log(tranx);

    const sumofSpendbyCard = () => {    
        return tranx.reduce((accumulator, currentValue) => {
            if (card.id === currentValue.card_id) 
            {
            accumulator = accumulator+currentValue.day_of_spend } 
            return accumulator
        }, 0)
    };
    console.log(sumofSpendbyCard());
    function LinearProgressWithLabel(props) {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
              <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
              <Typography variant="body2" color="text.secondary">{`${Math.round(
                props.value,
              )}%`}</Typography>
            </Box>
          </Box>
        );
      }

    return (
        <div>
            <p key={card.id}>
                {card.cc_name}
                {/* {card.spend_goal} */}
            </p>
            {/* Progress bar
            sumofSpendbyCard() / card.spend_goal */}
            <Box sx={{ width: '100%' }}>
                <LinearProgressWithLabel value={(sumofSpendbyCard()/card.spend_goal)*100} />
            </Box>
            <button onClick={cardHandleClickDelete}>DELETE</button>
            <button onClick={() => handleCarditem(card)}>Details Page</button>
        </div>
    )
}

export default CardItem;