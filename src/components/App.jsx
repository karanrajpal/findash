import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import WidgetWrapper from './WidgetWrapper';

// selectors for state
import { refreshIntervalSelector, marketOpenSelector } from '../selectors/stock-selectors';

// actions for dispatch
import { fetchPrices } from '../actions/actions.js';
import StockTable from './StockTable';

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
        const {
            prices,
            refreshInterval,
            marketOpen,
        } = this.props;

        return (<div>
            <WidgetWrapper>
                <div>Refresh Interval: {refreshInterval}</div>
                <div>Market Status: {marketOpen}</div>
            </WidgetWrapper>
            <WidgetWrapper>
                <StockTable />
            </WidgetWrapper>
        </div>)
    }
};

export default connect(
    (state) => ({
        refreshInterval: refreshIntervalSelector(state),
        marketOpen: marketOpenSelector(state),
    }),
    (dispatch) => ({
        fetchPrices: () => dispatch(fetchPrices()),
    })
)(App);
