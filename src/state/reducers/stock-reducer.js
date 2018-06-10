import {
    SET_SYMBOLS,
    RECEIVE_PRICES,
    SET_VIEWABLE_SYMBOLS,
} from '../actions/actions.js';

const initialState = {
    symbols: ['TWTR', 'FB', 'AAPL'],
    prices: {},
    refreshInterval: 1000,  // 1 second
    refreshIntervalMarketClosed: 20000, // 20 seconds
    viewableSymbols: ['TWTR', 'FB', 'AAPL'],
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
        case SET_VIEWABLE_SYMBOLS: {
            return {
                ...state,
                viewableSymbols: action.viewableSymbols,
            };
        }
        default:
            return state;
    }
};

export default stockReducer;
