import { put, call, takeLatest, select } from 'redux-saga/effects';

import * as Actions from '../actions/actions.js';

import { symbolsSelector, visibleSymbolsSelector } from '../selectors/stock-selectors';

import IexService from '../../services/iex-service';

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

function* addSymbol(action) {
    try {
        const newSymbols = yield select(symbolsSelector);
        const newSymbol = action.symbol.toUpperCase();
        const newSymbolLocation = newSymbols.indexOf(newSymbol);
        if (newSymbolLocation < 0) {
            newSymbols.push(newSymbol);
        }
        yield put(Actions.setSymbols(newSymbols));
        yield toggleVisibility({ symbol: newSymbol });
    } catch (error) {
        console.error(error);
    }
}

function* removeSymbol(action) {
    try {
        const newSymbols = yield select(symbolsSelector);
        const deleteSymbol = action.symbol.toUpperCase();
        const deleteSymbolLocation = newSymbols.indexOf(deleteSymbol);
        if (deleteSymbolLocation >= 0) {
            newSymbols.splice(deleteSymbolLocation, 1);
        }
        yield put(Actions.setSymbols(newSymbols));
        yield fetchPrices();
    } catch (error) {
        console.error(error);
    }
}

function* toggleVisibility(action) {
    try {
        const newVisibleSymbols = yield select(visibleSymbolsSelector);
        const toggleSymbol = action.symbol.toUpperCase();
        const toggleSymbolLocation = newVisibleSymbols.indexOf(toggleSymbol);
        if (toggleSymbolLocation >= 0) {
            newVisibleSymbols.splice(toggleSymbolLocation, 1);
        } else {
            newVisibleSymbols.push(toggleSymbol);
        }
        yield put(Actions.setVisibleSymbols(newVisibleSymbols));
        yield fetchPrices();
    } catch (error) {
        console.error(error);
    }
}

export default [
    takeLatest(Actions.FETCH_PRICES, fetchPrices),
    takeLatest(Actions.ADD_SYMBOL, addSymbol),
    takeLatest(Actions.REMOVE_SYMBOL, removeSymbol),
    takeLatest(Actions.TOGGLE_VISIBILITY, toggleVisibility),
];