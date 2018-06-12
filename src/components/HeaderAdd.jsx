import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { marketOpenSelector, refreshIntervalSelector } from '../state/selectors/config-selectors';
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

        return (<div>
            <div className='headline mui--text-headline'>Findash</div>
            <div className='header-add'>
                <div className='header-add__info'>
                    <div>Refresh Interval: {refreshInterval}</div>
                    <div>Market Status: {marketOpen}</div>
                </div>
                <div className='mui-textfield'>
                    <label>Add Symbol</label>
                    <input
                        type='text'
                        className='header-add__add'
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                addSymbol(event.target.value);
                                event.target.value = '';
                            }
                        }}
                    />
                </div>
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
