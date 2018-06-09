import React from 'react';
import ReactDOM from 'react-dom';

import '../styles/stocks.scss';

class WidgetWrapper extends React.Component {
    render() {
        return <div className='widget-wrapper'>
            <div className='widget-wrapper__title-bar' />
            <div className='widget-wrapper__content'>
                {this.props.children}
            </div>
        </div>
    }
};

export default WidgetWrapper;
