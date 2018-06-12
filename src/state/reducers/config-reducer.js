// import {
//     SET_SYMBOLS,
//     RECEIVE_PRICES,
//     SET_VIEWABLE_SYMBOLS,
// } from '../actions/actions.js';

const initialState = {
    refreshInterval: 1000,  // 1 second
    refreshIntervalMarketClosed: 25000, // 20 seconds
};

const stockReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export default stockReducer;
