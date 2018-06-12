import { combineReducers } from 'redux';
import stockReducer from './stock-reducer';
import configReducer from './config-reducer';

const rootReducer = combineReducers({
  stocks: stockReducer,
  config: configReducer,
});

export default rootReducer;
