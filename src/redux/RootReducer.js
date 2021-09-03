import { combineReducers } from 'redux';
import userReducer from './user/userReducer';
import booksReducer from './book/bookReducer';

export default combineReducers({
  user: userReducer,
  books: booksReducer,
});
