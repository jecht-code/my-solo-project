import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import {
    fetchTranxData,
  } from '../../../cardappapi/cardapp.api';

//This is the Import for Table setup of transaction
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Tab } from '@mui/material';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import { Select, MenuItem, Modal, Button, Box, Typography } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import { BarChart } from '@mui/x-charts/BarChart';

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

function CardDetailPage() {
    const { id } = useParams();
    const history = useHistory();
    const location = useLocation();
    // const card = history.location.state;
    const tranx = useSelector((store) => store.tranx);
    const cards =useSelector((store) => store.cards);
    const dispatch = useDispatch();

    //Store Modal Data for editing
    const [day_of_spend, setDaySpend] = useState('');
    const [date_spend_added, setDateSpent] = useState('');
    const [category_spend, setCategorySpend] = useState('');
    
    console.log('Card ID test', Number(id));

    //This would be card id becaues depending on which card you select..
    const transactions = tranx.filter((transact) => transact.card_id === Number(id))
    const card = cards.filter((card_array) => card_array.id === Number(id))
    //Initialize useState after Transactions Filter
    //const [id, setTranxId] = useState('');

    console.log(transactions);
    console.log(card);

    //PUT SAGA TEST
    const [editTranx, setEditTranx] = useState({ id: 1, day_of_spend: '', date_spend_added: new Date(), category_spend: ''})

    //Modal useState
    const [open, setOpen] = useState(false);
    const handleOpen = (tranx_array) => {
        setEditTranx(tranx_array);
        setOpen(true);
    };
    const handleClose = () => setOpen(false);

    const handleBackTo = () => {
        history.push({ pathname: '/user', state: card })
        console.log({history})
    }

    //Modal for Put
    const handleEditTranx = () => {
        dispatch({ type: 'UPDATE_TRANX', payload: editTranx })

        // axios
        //     .put(`/api/tranx/${editTranx.id}`, { editTranx })
        //     .then((response) => {
        //         dispatch({ type: 'FETCH_TRANX', payload: tranxResponse.data })
        //     })
        //     .then((response) => {
        //         history.push({ pathname: `/detailspage/${card.id}`})
        //     })
        //     .catch((error) => {
        //         console.log('ERROR:', error);
        //     });
        
        //clear inputs for tranx
        // setDaySpend('');
        // setDateSpent('');
        // setCategorySpend('');
    }
    //console.log('Checking Card State',card.cc_name);
    //console.log('TestArray', JSON.stringify(transactions));
    //console.log({transactions});

    const tranxHandleClickDelete = (tranx_id) => {
        console.log('DELETE', tranx_id);
        dispatch({ type: 'DELETE_TRANX', payload: { id: tranx_id } })
        // axios
        //     .delete(`/api/tranx/${id}`)
        //     .then((response) => {
        //         //refreshCardList();
        //         //fetchTranxList();
        //     })
        //     .catch((error) => {
        //         console.log('ERROR:', error);
        //     });
    };

    function testLoop() {
        transactions.map((trans) => trans.date_spend_added = new Date(trans.date_spend_added))
    };

    testLoop();

    return (
      <main data-testid='CardDetailsPage'>
        <h1>Details</h1>
        <h2>{card.cc_name}</h2>
        <button data-testid='toList' onClick={() => handleBackTo()}>Return to List</button>

        <BarChart
            dataset={transactions}
            xAxis={[{ scaleType: 'band', dataKey: 'category_spend'}]}
            series={[{ dataKey: 'day_of_spend'}]}
            width={500}
            height={300}
        />

        <LineChart
            //dataset={transactions.map((trans) => trans.date_spend_added = new Date(trans.date_spend_added))}
            dataset={transactions}
            xAxis={[{ scaleType: 'time', dataKey: 'date_spend_added' }]}
            //xAxis={[{ scaleType: 'time', data: [new Date("2024-04-01"), new Date("2024-04-02"), new Date("2024-04-03"), new Date("2024-04-04")] }]}
            // xAxis={[{ scaleType: 'time', data: [2024-04-01, "2024-04-02", "2024-04-03","2024-04-04","2024-04-05","2024-04-06"] }]}
            series={[{ dataKey: 'day_of_spend'}]}
            // series={[
            // {
            // data: [2, 5.5, 2, 8.5],
            // },
            // ]}
            width={500}
            height={300}
            
        />

        <Table>
            <TableBody>
                {transactions.map(transaction => {
                    return (
                        <TableRow key={transaction.id}>
                            <TableCell component="th" scope="row">
                                <DeleteIcon onClick={() => tranxHandleClickDelete(transaction.id)}></DeleteIcon>
                                <BorderColorIcon onClick={() => handleOpen(transaction)}></BorderColorIcon>
                                <Modal
                                    open={open}
                                    // onOpen={() => handleOpen(transaction)}
                                    onClose={handleClose}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <Box sx={style}>
                                        <Typography id="modal-modal-putTitle" variant="subtitle1">
                                            <form  onSubmit={() => handleEditTranx(transaction.id)} className="add-card-data">
                                            
                                                <label>
                                                    Date Spent
                                                    <input 
                                                    required
                                                    placeholder='Date Spent'
                                                    value={editTranx.date_spend_added.toISOString().split('T')[0]}
                                                    //onChange={(event) => setEditTranx(event.target.value)}
                                                    onChange={(event) =>
                                                        setEditTranx({ ...editTranx, date_spend_added: event.target.value })
                                                      }
                                                    //onChange={(event) => transaction.date_spend_added = event.target.value}
                                                    type="date" />
                                                </label>

                                                <input 
                                                required
                                                placeholder='Amount Spent'
                                                value={editTranx.day_of_spend}
                                                //onChange={(event) => setDaySpend(event.target.value)}
                                                //onChange={(event) => transaction.day_of_spend = event.target.value}
                                                onChange={(event) =>
                                                    setEditTranx({ ...editTranx, day_of_spend: event.target.value })
                                                  }
                                                type="number" />

                                                <input 
                                                required
                                                placeholder='Category'
                                                value={editTranx.category_spend}
                                                //onChange={(event) => setCategorySpend(event.target.value)}
                                                //onChange={(event) => transaction.category_spend = event.target.value}
                                                onChange={(event) =>
                                                    setEditTranx({ ...editTranx, category_spend: event.target.value })
                                                  }
                                                type="text" />

                                                <button type="submit">Add Transaction</button>
                                            </form>
                                        </Typography>
                                    </Box>
                                </Modal>
                            </TableCell>
                            <TableCell>{transaction.category_spend}</TableCell>
                            <TableCell>{transaction.date_spend_added.toLocaleDateString()}</TableCell>
                            <TableCell>{transaction.day_of_spend}</TableCell>
                        </TableRow>
                    );
                    })}
            </TableBody>
        </Table>

        {/* <div>
        {transactions.map((transaction) => {
                return (
                    <div data-testid='transaction-item' key={transaction.id}>
                    <h3>{transaction.category_spend}</h3>
                    <p>{transaction.day_of_spend}</p>
                    </div>
                )
            })}
        </div> */}

      </main>
    );
  }

export default CardDetailPage;