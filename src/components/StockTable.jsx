import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { stockDataSelector } from '../state/selectors/stock-selectors';
import { removeSymbol } from '../state/actions/actions.js';

import '../styles/stocks.scss';

class StockTable extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }
    render() {
        const {
            stockData,
            removeSymbol,
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
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(stockData).map((symbol) => {
                        const quote = stockData[symbol].quote;
                        const rgbOpacity = Math.min(Math.abs(quote.changePercent) * 20, 1);
                        let backgroundColor = `rgba(255, 0, 0, ${rgbOpacity})`;
                        if (quote.changePercent > 0) {
                            backgroundColor = `rgba(0, 255, 0, ${rgbOpacity})`;
                        }
                        return (
                            <tr
                                key={symbol}
                                data-key={symbol}
                                style={{ backgroundColor: backgroundColor }}
                            >
                                <td title={quote.companyName}>{quote.symbol}</td>
                                <td>{quote.latestPrice}</td>
                                <td>{quote.change}</td>
                                <td>{(quote.changePercent * 100).toFixed(3)}</td>
                                <td>{quote.latestVolume}</td>
                                <td>{quote.sector}</td>
                                <td onClick={(event) => {
                                    removeSymbol(event.target.parentElement.getAttribute('data-key'));
                                }}>Delete</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    }
};

export default connect(
    (state) => ({
        stockData: stockDataSelector(state),
    }),
    (dispatch) => ({
        removeSymbol: (symbol) => dispatch(removeSymbol(symbol))
    }),
)(StockTable);
