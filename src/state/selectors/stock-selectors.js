import { createSelector } from 'reselect';

export const symbolsSelector = (state) => state.stocks.symbols;
export const visibleSymbolsSelector = (state) => state.stocks.visibleSymbols;
export const stockDataSelector = (state) => state.stocks.prices || [];
export const filteredStockDataSelector = createSelector(
    [stockDataSelector, visibleSymbolsSelector],
    (stockData, visibleSymbols) => {
        const filteredStockData = Object.keys(stockData)
        .filter(key => visibleSymbols.includes(key))
        .reduce((obj, key) => ({
            ...obj,
            [key]: stockData[key]
        }),
        {});
        return filteredStockData;
    }
);

export const graphDataSelector = createSelector(
    [filteredStockDataSelector],
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
    [filteredStockDataSelector],
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
