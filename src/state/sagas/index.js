import { take, put, call, fork, select, takeEvery, all } from 'redux-saga/effects'

import stockSagas from './stock-sagas';

export default function* rootSaga() {
    yield all([
        ...stockSagas,
    ]);
}
