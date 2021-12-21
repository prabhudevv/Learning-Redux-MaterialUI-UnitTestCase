import React from 'react';
import { Provider } from 'react-redux';
import App from './App';
import configureStore from './store/config/configureStore';

export const store = configureStore();
store.subscribe(() => { });

const StoreProvider = () => (
	<Provider store={store}>
		<App/>
	</Provider>
)

export default StoreProvider;