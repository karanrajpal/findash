import {
    SET_SYMBOLS,
    RECEIVE_PRICES
} from '../actions/actions.js';

const initialState = {
    symbols: ['TWTR', 'FB', 'AAPL'],
    prices: {},
    refreshInterval: 1000,  // 1 second
    refreshIntervalMarketClosed: 20000, // 20 seconds
};

const stockReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SYMBOLS: {
            return {
                ...state,
                symbols: action.symbols,
            };
        }
        case RECEIVE_PRICES: {
            return {
                ...state,
                prices: action.prices,
            };
        }
        default:
            return state;
    }
};

export default stockReducer;
