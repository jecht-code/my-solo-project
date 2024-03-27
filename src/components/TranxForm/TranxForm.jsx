import { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import React, { useEffect } from 'react';

//import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

function TranxForm( {refreshCardList} ) {
    const cards = useSelector(store => store.cards);
    //add the fields that you want to add as useState
    const [day_of_spend, setDayspend] = useState('');
    const [date_spend_added, setDatespend] = useState('');
    const [category_spend, setCategoryspend] = useState('');
    //selector usestate
    const [cardselected, setCarselected] = useState('');

    const handleSubmitTranx = (event) => {
        event.preventDefault();
        console.log(`Adding Transaction Data`, { day_of_spend, date_spend_added, category_spend, cardselected })

        axios
            .post('/api/tranx', { day_of_spend, date_spend_added, category_spend, cardselected })
            .then((response) => {
                //Needs to be REFRESH TRANS List
                refreshCardList();
            })
            .catch((error) => {
                console.log('ERROR:', error);
            });
        //clear inputs
        setDayspend('');
        setDatespend('');
        setCategoryspend('');
        setCarselected('');
    }

    const handleChange = (event) => {
        setCarselected(event.target.value);
    };

    return (
        <section>
            <h2>Add Transaction</h2>

            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={cardselected}
                label="Pick a Card"
                onChange={handleChange}
            >
                {cards.map((listCards) => {
                    return (
                        <MenuItem value={listCards.id}>{listCards.cc_name}</MenuItem>
                    )
                })}
            </Select>

            <form onSubmit={handleSubmitTranx} className="add-tranx-data">
                <input 
                required
                placeholder='Amount Spent'
                value={day_of_spend}
                onChange={(event) => setDayspend(event.target.value)}
                type="number" />

                <input 
                required
                placeholder='Spend Date'
                value={date_spend_added}
                onChange={(event) => setDatespend(event.target.value)}
                type="date" />

                <input 
                required
                placeholder='Category'
                value={category_spend}
                onChange={(event) => setCategoryspend(event.target.value)}
                type="text" />

                <button type="submit">Add Transaction</button>
            </form>
        </section>
    )
}

export default TranxForm;