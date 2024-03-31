import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

//This is the Import for Table setup of transaction
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Tab } from '@mui/material';

function CardDetailPage() {
    const history = useHistory();
    const location = useLocation();
    console.log(location);
    const card = history.location.state;
    console.log(card);
    const tranx = useSelector((store) => store.tranx);
    console.log(tranx);
    console.log('Transact ID', tranx.card_id);
    console.log('card ID', card.id);
    //This would be card id becaues depending on which card you select..
    const transactions = tranx.filter((transact) => transact.card_id === card.id)

    console.log(transactions)

    const handleBackTo = () => {
        history.push({ pathname: '/user', state: card })
        console.log({history})
    }
  
    return (
    
      <main data-testid='CardDetailsPage'>
        <h1>DetailsPage</h1>
        <h2>{card.cc_name}</h2>
        <button data-testid='toList' onClick={() => handleBackTo()}>Return to List</button>
        <Table>
            <TableBody>
                {transactions.map(transaction => {
                    return (
                        <TableRow key={transaction.id}>
                            <TableCell component="th" scope="row">
                                <button>Delete</button>
                                <button>Edit</button>
                            </TableCell>
                            <TableCell>{transaction.category_spend}</TableCell>
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