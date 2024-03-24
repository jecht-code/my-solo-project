import axios from 'axios';

// Axios Calls for my Card Data
export async function fetchCardData() {
    try {
        const response = await axios.get('/api/card')
        return response;
    } catch (error) {
        console.log('Error:', error)
    }
    //axios GET call
    // return axios.get('/api/card');
};

export const postCardData = (cardData) => {
    //axios POST call
    return axios.post('/api/card', cardData);
};

export const deleteCardData = (cardId) => {
    //axios DELETE call
    return axios.delete(`/api/card/${cardId}`);
};

//Axios call for my Transacton Data
export async function fetchTranxData() {
    try {
        const response = await axios.get('/api/tranx')
        return response;
    } catch (error) {
        console.log('Error:', error)
    }
    //axios GET call
    //return axios.get('/api/transaction');
};

export const postTranxData = (tranxData) => {
    //axios POST call
    return axios.post('/api/transaction', tranxData);
};

export const deleteTranxData = (tranxId) => {
    //axios DELETE call
    return axios.delete(`/api/transaction/${tranxId}`);
};

export const updateTranxData = (tranxId) => {
    //axios Put call
    return axios.put(`/api/transaction/${tranxId}`);
};