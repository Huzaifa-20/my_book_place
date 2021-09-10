import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import RootReducer from './RootReducer';

/**
 * Creating a redux store with logger middle ware
 */

const middleware = [thunk];

if (process.env.NODE_ENV === 'development') {
  middleware.push(logger);
}

const store = createStore(RootReducer, applyMiddleware(...middleware));

export default store;
