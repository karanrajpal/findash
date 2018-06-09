import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers';
import { loadState, saveState } from './localStorage';

// redux-sagas middleware
// https://github.com/redux-saga/redux-saga
// https://redux-saga.js.org/
import createSagaMiddleware from 'redux-saga'

import rootSaga from './sagas';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState) {
	let persistedState = loadState();
	if (!persistedState) {
		persistedState = initialState;
	}
    const store = createStore(rootReducer, persistedState, applyMiddleware(sagaMiddleware));

    store.subscribe(() => {
    	saveState(store.getState());
    });

    sagaMiddleware.run(rootSaga);

    // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
    if (module.hot) {
        module.hot.accept('./reducers', () =>
            store.replaceReducer(require('./reducers'))
        );
    }

    return store;
};
