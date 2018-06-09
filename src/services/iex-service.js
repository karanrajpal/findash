export default class IexService {
	constructor() {
		this.url = 'https://api.iextrading.com/1.0/stock/market/batch';
	}

	async fetchPrices(symbols) {
		const url = `${this.url}?types=quote&symbols=${symbols.join(',')}`;
		const response = await fetch(url);
		return response.json();
	}
}