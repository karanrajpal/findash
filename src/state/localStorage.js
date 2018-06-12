export const loadState = () => {
	try {
		const serializedState = localStorage.getItem('state');
		// const serializedState = null;
		if (serializedState === null) {
			return undefined;	// so the reducer can use the default state
		}
		return JSON.parse(serializedState);
	} catch (err) {
		return undefined;
	}
}

export const saveState = (state) => {
	try {
		const serializedState = JSON.stringify(state);
		localStorage.setItem('state', serializedState);
	} catch (err) {
		console.log('saveState failed');
	}
}
