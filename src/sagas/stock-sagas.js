import { put, call, takeLatest, select } from 'redux-saga/effects';

import * as Actions from '../actions/actions.js';

import { symbolsSelector } from '../selectors/stock-selectors';

import IexService from '../services/iex-service';

const iexService = new IexService();

function* fetchPrices() {
    try {
        const symbols = yield select(symbolsSelector)
        const prices = yield call([iexService, iexService.fetchPrices], symbols);
        yield put(Actions.receivePrices(prices));
    } catch (error) {
        console.error(error);
    }
}

export default [
    takeLatest(Actions.FETCH_PRICES, fetchPrices),
];