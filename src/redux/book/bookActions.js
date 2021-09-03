import bookActionTypes from './bookTypes';

export const setUserBooks = (books) => ({
  type: bookActionTypes.SET_USER_BOOKS,
  payload: books,
});

export const setAllBooks = (books) => ({
  type: bookActionTypes.SET_ALL_BOOKS,
  payload: books,
});
