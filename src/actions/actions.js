export const ADD_SYMBOL = 'ADD_SYMBOL';
export const FETCH_PRICES = 'FETCH_PRICES';
export const RECEIVE_PRICES = 'RECEIVE_PRICES';

export const fetchPrices = () => ({
    type: FETCH_PRICES
});

export const receivePrices = (prices) => ({
    type: RECEIVE_PRICES,
    prices,
});
