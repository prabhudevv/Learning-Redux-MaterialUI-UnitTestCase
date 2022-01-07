import thunk from "redux-thunk";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import userReducer from "../reducers/userReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = () =>
  createStore(
    combineReducers({
      user: userReducer,
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

export default configureStore;
