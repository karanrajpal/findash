import {
    ADD_SYMBOL,
    REMOVE_SYMBOL,
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
        case ADD_SYMBOL: {
            const newSymbols = state.symbols;
            const newSymbol = action.symbol.toUpperCase();
            const newSymbolLocation = newSymbols.indexOf(newSymbol);
            if (newSymbolLocation < 0) {
                newSymbols.push(newSymbol);
            }
            return {
                ...state,
                symbols: newSymbols,
            };
        }
        case REMOVE_SYMBOL: {
            const newSymbols = state.symbols;
            const deleteSymbol = action.symbol;
            const deleteSymbolLocation = newSymbols.indexOf(deleteSymbol);
            if (deleteSymbolLocation >= 0) {
                newSymbols.splice(newSymbols.indexOf(deleteSymbol), 1);
            }
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
