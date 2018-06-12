import { createSelector } from 'reselect';

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
