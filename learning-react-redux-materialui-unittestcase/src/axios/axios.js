import axios from 'axios';
import { store } from '../StoreProvider';
import services from '../constants/urls.json';
import { showAlert } from '../store/actions/alertActions';

const urls = services['local'];

axios.interceptors.response.use(
	(res) => res,
	(err) => {
		const errBody = err.response.data;
		store.dispatch(showAlert(errBody.message, 'error'));
	}
);

axios.interceptors.request.use(function (config) {
	return config;
});

export const getService = (baseUrlType, url) =>
	axios.get(urls[baseUrlType] + url);