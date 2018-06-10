import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { newsDataSelector } from '../state/selectors/stock-selectors';

import '../styles/stocks.scss';

class NewsList extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;

        this.clean = this.clean.bind(this);
    }

    clean(text) {
        return text.replace('&apos;', '\'');
    }

    render() {
        const {
            newsData,
        } = this.props;
        console.log(newsData);

        return <div className='news-list'>
            <ul className='mui-list--unstyled'>
            {
                newsData.map((item, idx) => {
                    return <li className='news-list__news-item mui-panel' key={idx}>
                        <div className='news-list__title'>
                            <a href={item.url}>{this.clean(item.headline)}</a>
                        </div>
                        <div className='news-list__summary'>{item.summary}</div>
                        <div className='news-list__source'>{item.source}</div>
                        <div className='news-list__symbol'>{item.symbols.join(', ')}</div>
                    </li>
                })
            }
            </ul>
        </div>
    }
};

/* {"datetime":"2018-06-10T06:36:18-04:00",
"headline":"Apple&apos;s Conscious Uncoupling",
"source":"SeekingAlpha",
"url":"https://api.iextrading.com/1.0/stock/fb/article/6734357522688646",
"summary":" In Brand Strategy, we introduce the concept of laddering, an attempt to deposition a competitor by highlighting an attribute or area where they are weak. Its the corporate equivalent of buying your wife an exceptional Mothers Day gift because: 1) you love her; and 2) you want t…",
"related":"AAPL,AMZN,Computer Hardware,CON31167138,CRM,FB,GOOG,GOOGL,NASDAQ01,Computing and Information Technology"}]

[{"datetime":"2018-06-09T11:11:54-04:00","headline":"Venture Capital Deals Of The Week: Ant Financial Gets $14B Ahead Of IPO","source":"SeekingAlpha","url":"https://api.iextrading.com/1.0/stock/msft/article/8621095932739381","summary":" Welcome to Seeking Alphas Venture Capital Deals of the Week. Follow this account and turn on the e-mail alert to receive VCDeals in your inbox on Saturday mornings. Largest single fundraiser ever: Alibabas (BABA) Ant Financial raised $14B , the largest single fund…","related":"APPN,ATHM,BABA,CON102,CRL,CRM,GOOG,GOOGL,GS,HPE,IBM,INTHPINK,IQV,JD,MSFT,NASDAQ01,NTAP,RET10217,SFTBF,SFTBY,SPECRTIL,TCEHY,TCTZF,TROW,Venture Capital,WDC"}

*/
export default connect(
    (state) => ({
        newsData: newsDataSelector(state),
    }),
    (dispatch) => ({
    }),
)(NewsList);
