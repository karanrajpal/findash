import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
// import Button from 'muicss/lib/react/button';

import { refreshIntervalSelector, marketOpenSelector } from '../state/selectors/stock-selectors';
import { addSymbol } from '../state/actions/actions.js';

import '../styles/stocks.scss';

class HeaderAdd extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }
    render() {
        const {
            refreshInterval,
            marketOpen,
            addSymbol,
        } = this.props;

        return (<div className='header-add'>
            <div className='header-add__info'>
                <div>Refresh Interval: {refreshInterval}</div>
                <div>Market Status: {marketOpen}</div>
            </div>
            <div className='mui-textfield'>
                <input
                    type='text'
                    className='header-add__add'
                    placeholder='Add Symbol'
                    onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                            addSymbol(event.target.value);
                        }
                    }}
                />
            </div>
        </div>);
    }
};

export default connect(
    (state) => ({
        refreshInterval: refreshIntervalSelector(state),
        marketOpen: marketOpenSelector(state),
    }),
    (dispatch) => ({
        addSymbol: (symbol) => dispatch(addSymbol(symbol)),
    })
)(HeaderAdd);
