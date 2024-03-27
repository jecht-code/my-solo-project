import { useState } from 'react';
import axios from 'axios';

//import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function TranxForm( {refreshCardList} ) {
    
    //add the fields that you want to add as useState
    const [dayspend, setDayspend] = useState('');
    const [datespend, setDatespend] = useState('');
    const [categoryspend, setCategoryspend] = useState('');

    const handleSubmitTranx = (event) => {
        event.preventDefault();
        console.log(`Adding Transaction Data`, { dayspend, datespend, categoryspend })

        axios
            .post('/api/transaction', { dayspend, datespend, categoryspend })
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
    }
    return (
        <section>
            <h2>Add Transaction</h2>
            <form onSubmit={handleSubmitTranx} className="add-tranx-data">
                <input 
                required
                placeholder='Amount Spent'
                value={dayspend}
                onChange={(event) => setDayspend(event.target.value)}
                type="text" />

                <input 
                required
                placeholder='Spend Date'
                value={datespend}
                onChange={(event) => setDayspend(event.target.value)}
                type="text" />

                <input 
                required
                placeholder='Category'
                value={categoryspend}
                onChange={(event) => setDayspend(event.target.value)}
                type="text" />

            </form>
        </section>
    )
}

export default TranxForm;