import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = () => createStore(
	combineReducers({
		// reducer-name: reducer
	}),
	composeEnhancers(applyMiddleware(thunk))
);

export default configureStore;