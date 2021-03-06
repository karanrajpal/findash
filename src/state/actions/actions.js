export const ADD_SYMBOL = 'ADD_SYMBOL';
export const REMOVE_SYMBOL = 'REMOVE_SYMBOL';
export const SET_SYMBOLS = 'SET_SYMBOLS';
export const FETCH_PRICES = 'FETCH_PRICES';
export const RECEIVE_PRICES = 'RECEIVE_PRICES';
export const TOGGLE_VISIBILITY = 'TOGGLE_VISIBILITY';
export const SET_VISIBLE_SYMBOLS = 'SET_VISIBLE_SYMBOLS';

export const fetchPrices = () => ({
    type: FETCH_PRICES,
});

export const receivePrices = (prices) => ({
    type: RECEIVE_PRICES,
    prices,
});

export const addSymbol = (symbol) => ({
	type: ADD_SYMBOL,
	symbol,
});

export const removeSymbol = (symbol) => ({
	type: REMOVE_SYMBOL,
	symbol,
});

export const toggleVisibility = (symbol) => ({
	type: TOGGLE_VISIBILITY,
	symbol,
});

export const setSymbols = (symbols) => ({
	type: SET_SYMBOLS,
	symbols,
});

export const setVisibleSymbols = (visibleSymbols) => ({
	type: SET_VISIBLE_SYMBOLS,
	visibleSymbols,
});
