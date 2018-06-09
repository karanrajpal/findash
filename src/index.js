import React from 'react';
import ReactDOM from 'react-dom';
// import './styles/main.scss';

import configureStore from './configureStore';
import Root from './components/Root';

const store = configureStore();

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root')
);

module.hot.accept();
