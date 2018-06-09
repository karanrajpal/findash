import { ADD_SYMBOL, RECEIVE_PRICES } from '../actions/actions.js';

const initialState = {
    symbols: ['TWTR', 'FB', 'AAPL'],
    prices: {},
    refreshInterval: 1000,  // 1 second
    refreshIntervalMarketClosed: 20000, // 20 seconds
};

const stockReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_SYMBOL: {
          const newSymbols = state.symbols;
          newSymbols.push(action.newSymbol);
            return {
                ...state,
                symbols: newSymbols,
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
