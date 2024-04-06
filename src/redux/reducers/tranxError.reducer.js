export const tranxErrors = (state = null, action) => {
    switch (action.type) {
        case 'ERROR_TRANX':
            //excute this code
            return action.payload;
        default:
            return state;
    }
}

export default tranxErrors;