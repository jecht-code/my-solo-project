import axios from 'axios';
import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';

//Material UI Package Import
//import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Select, MenuItem, Modal, Button, Box, Typography } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

function TranxForm( {refreshCardList} ) {
    //This brings over Cards items to render under MenuItem Compoenent within Select Component
    const cards = useSelector(store => store.cards);
    const user = useSelector((store) => store.user);
    //Add Fields for Transaction Data Form field.
    const [day_of_spend, setDayspend] = useState('');
    const [date_spend_added, setDatespend] = useState('');
    const [category_spend, setCategoryspend] = useState('');
    //Used for Select Component useState
    const [cardselected, setCarselected] = useState('');

    //Modal useState
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    //ADd Fields for Cards Data Form Field Modal.
    const [cc_name, setcc_name] = useState('');
    const [date_start, setDateStart] = useState('');
    const [date_promo_end, setDatePromoEnd] = useState('');
    const [spend_goal, setSpendGoal] = useState('');
    const [credit_limit, setCreditLimit] = useState('');
    const [rewards_value, setRewardsValue] = useState('');
    const [bankcard_name, setBankCardName] = useState('');
    const [user_id, setUserId] = useState(user.id);

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
        
        //clear inputs for tranx
        setDayspend('');
        setDatespend('');
        setCategoryspend('');
        setCarselected('');
    }

    const handleChange = (event) => {
        setCarselected(event.target.value);
    };

    //MODAL - For Post Route - Cards.
    const handleSubmitCards = (event) => {
        event.preventDefault();
        console.log(`Adding Card Data`, { cc_name, date_start, date_promo_end, spend_goal, credit_limit, rewards_value, bankcard_name, user_id})

        axios
            .post('/api/card', { cc_name, date_start, date_promo_end, spend_goal, credit_limit, rewards_value, bankcard_name, user_id})
            .then((response) => {
                //Needs to be REFRESH TRANS List
                refreshCardList();
            })
            .catch((error) => {
                console.log('ERROR:', error);
            });
        
        //clear inputs for tranx
        setcc_name('');
        setDateStart('');
        setDatePromoEnd('');
        setCarselected('');
        setSpendGoal('');
        setCreditLimit('');
        setRewardsValue('');
        setBankCardName('');
        //setUserId('');
    }

    return (
        <section>
            <h4>Add Transaction</h4>

            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={cardselected}
                label="Pick a Card"
                onChange={handleChange}
            >
                {cards.map((listCards) => {
                    return (
                        <MenuItem key={listCards.id} value={listCards.id}>{listCards.cc_name}</MenuItem>
                    )
                })}
            </Select>

            <Button onClick={handleOpen}>Add a Card</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="subtitle1">
                        <form onSubmit={handleSubmitCards} className="add-card-data">
                            
                            <label>
                                Date Started
                                <input 
                                required
                                placeholder='Date Started'
                                value={date_start}
                                onChange={(event) => setDateStart(event.target.value)}
                                type="date" />
                            </label>

                            <label>
                                Promo End Date
                                <input 
                                required
                                placeholder='Promo End Date'
                                value={date_promo_end}
                                onChange={(event) => setDatePromoEnd(event.target.value)}
                                type="date" />
                            </label>

                            <input 
                            required
                            placeholder='Credit Card Name'
                            value={cc_name}
                            onChange={(event) => setcc_name(event.target.value)}
                            type="text" />

                            <input 
                            required
                            placeholder='Spend Goal'
                            value={spend_goal}
                            onChange={(event) => setSpendGoal(event.target.value)}
                            type="number" />

                            <input 
                            required
                            placeholder='Credit Card Limit'
                            value={credit_limit}
                            onChange={(event) => setCreditLimit(event.target.value)}
                            type="number" />

                            <input 
                            required
                            placeholder='Cash Back Rewards Value'
                            value={rewards_value}
                            onChange={(event) => setRewardsValue(event.target.value)}
                            type="number" />

                            <input 
                            required
                            placeholder='Bank Card Name'
                            value={bankcard_name}
                            onChange={(event) => setBankCardName(event.target.value)}
                            type="Text" />

                            <button type="submit">Add Card to Page</button>
                        </form>
                    </Typography>
                </Box>
            </Modal>

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