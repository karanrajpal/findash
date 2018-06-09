import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
// import Button from 'muicss/lib/react/button';

import { pricesSelector } from '../selectors/stock-selectors';

import '../styles/stocks.scss';

class StockTable extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }
    render() {
        const {
            prices
        } = this.props;

        return <div className='stock-table'>
            <table className='mui-table'>
                <thead>
                    <tr>
                        <th>Symbol</th>
                        <th>Price</th>
                        <th>Change ($)</th>
                        <th>Change (%)</th>
                        <th>Latest Volume</th>
                        <th>Sector</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(prices).map((symbol) => {
                        const quote = prices[symbol].quote;
                        return <tr key={symbol} className={quote.changePercent > 0 ? 'green' : 'red'}>
                            <td>{quote.symbol}</td>
                            <td>{quote.latestPrice}</td>
                            <td>{quote.change}</td>
                            <td>{quote.changePercent}</td>
                            <td>{quote.latestVolume}</td>
                            <td>{quote.sector}</td>
                        </tr>
                    })}
                    <tr key='add'>
                        <td><button className='button-add-symbol' onClick = {() => { show }}>Add Symbol</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    }
};

export default connect(
    (state) => ({
        prices: pricesSelector(state),
    }),
    null
)(StockTable);
