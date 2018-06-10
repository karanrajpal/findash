import { createSelector } from 'reselect';

export const symbolsSelector = (state) => state.stocks.symbols;
export const stockDataSelector = (state) => state.stocks.prices;

export const marketOpenSelector = (state) => {
    const d = new Date(); // for now
    const hour = d.getHours();
    const minute = d.getMinutes();
    const day = d.getDay();
    if (day === 0 || day === 6) {
        return 'Closed';
    } else if ((hour > 9 && hour <= 16) || (hour === 9 && minute >= 30)) {
        return 'Open';
    } else if (hour >= 4 && hour <= 9) {
        return 'Extended';
    } else {
        return 'Closed';
    }
};

export const graphDataSelector = createSelector(
    [stockDataSelector],
    (stockData) => {
        let transformedChartData = [];
        if (!stockData) {
            return [];
        }
        const stockDataValues = Object.values(stockData);
        transformedChartData = stockDataValues.map(stock => {
            const stockChartData = {
                id: stock.quote.symbol,
                color: "hsl(120, 70%, 50%)",
            };
            const iexChartData = stock['chart'].slice(0, 20);
            // console.log(stock.quote.symbol, iexChartData.length);
            stockChartData['data'] = iexChartData.map(historyArr => {
                return {
                    "color": "hsl(110, 70%, 50%)",
                    "x": historyArr["label"],
                    "y": historyArr["changePercent"],
                };
            });
            return stockChartData;
        });
        // console.log(transformedChartData);
        return transformedChartData;
    }
);

// Specific to Iex API
const urlToId = (url) => {
    return url.substr(url.lastIndexOf('/')+1);
};

export const newsDataSelector = createSelector(
    [stockDataSelector],
    (stockData) => {
        if (!stockData) {
            return [];
        }
        const stockDataValues = Object.values(stockData);
        const uniqueNewsById = {};
        stockDataValues.forEach(stock => {
            const news = stock['news'];
            const symbol = stock.quote.symbol;
            news.forEach(newsItem => {
                const newsId = urlToId(newsItem['url']);
                if (newsId in uniqueNewsById) {
                    uniqueNewsById[newsId]['symbols'].push(symbol);
                } else {
                    uniqueNewsById[newsId] = {
                        ...newsItem,
                        symbols: [symbol],
                    };
                }
            });
        });
        return Object.values(uniqueNewsById);
    }
);

export const refreshIntervalSelector = createSelector(
    [state => state.stocks.refreshInterval,
    state => state.stocks.refreshIntervalMarketClosed,
    marketOpenSelector],
    (refreshInterval, refreshIntervalMarketClosed, marketOpen) => {
        if (marketOpen === 'Open') {
            return refreshInterval;
        } else {
            return refreshIntervalMarketClosed;
        }
    }
);
