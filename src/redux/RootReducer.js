import { combineReducers } from 'redux';

import userReducer from './user/userReducer';
import booksReducer from './book/bookReducer';

/**
 * Creating a single Root Reducer to combine
 * the User and Books reducers
 */

export default combineReducers({
  user: userReducer,
  books: booksReducer,
});
