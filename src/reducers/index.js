import { combineReducers } from 'redux';
import stockReducer from './stock-reducer';

const rootReducer = combineReducers({
  stocks: stockReducer,
});

export default rootReducer;
