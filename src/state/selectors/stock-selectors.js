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



// Clean News Text
const clean = (text) => {
    return text
    .replace(/&apos;/g, '\'')
    .replace(/&amp;/g, '&');
};

function timeSince(date) {

  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return interval + " years";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}

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
                    newsItem['headline'] = clean(newsItem['headline']);
                    newsItem['summary'] = clean(newsItem['summary']);
                    var d = new Date(newsItem['datetime']);
                    newsItem['timesince'] = timeSince(d);
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
