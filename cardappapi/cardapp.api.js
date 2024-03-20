import axios from 'axios';

// Axios Calls for my Card Data
export const fetchCardData = () => {
    //axios GET call
    return axios.get('/api/card');
};

export const postCardData = (cardData) => {
    //axios POST call
    return axios.post('/api/card', todoData);
};

export const deleteCardData = (cardId) => {
    //axios DELETE call
    return axios.delete(`/api/card/${cardId}`);
};

export const fetchTranxData = () => {
    //axios GET call
    return axios.get('/api/transaction');
};

export const postTranxData = (cardData) => {
    //axios POST call
    return axios.post('/api/card', todoData);
};

export const deleteTranxData = (cardId) => {
    //axios DELETE call
    return axios.delete(`/api/card/${cardId}`);
};

export const updateTranxData = (todoId) => {
    //axios Put call
    return axios.put(`/api/card/${todoId}`);
};

