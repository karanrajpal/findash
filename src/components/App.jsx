import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

// selectors for state
import { refreshIntervalSelector, marketOpenSelector } from '../state/selectors/stock-selectors';

// actions for dispatch
import { fetchPrices } from '../state/actions/actions.js';

import WidgetWrapper from './WidgetWrapper';
import StockTable from './StockTable';
import HeaderAdd from './HeaderAdd';
import ComparisonGraph from './ComparisonGraph';

class App extends React.Component {
    constructor(props) {
        super();
        this.props = props;

        const {
            fetchPrices,
            refreshInterval,
        } = this.props;

        fetchPrices();
        setInterval(fetchPrices, refreshInterval);
    }

    render() {
        return (<div className='mui-container-fluid'>
            <WidgetWrapper><HeaderAdd /></WidgetWrapper>
            <WidgetWrapper><StockTable /></WidgetWrapper>
            <WidgetWrapper><ComparisonGraph /></WidgetWrapper>
        </div>)
    }
};

export default connect(
    (state) => ({
        refreshInterval: refreshIntervalSelector(state),
    }),
    (dispatch) => ({
        fetchPrices: () => dispatch(fetchPrices()),
    })
)(App);
