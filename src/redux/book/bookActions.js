import bookActionTypes from './bookTypes';

/**
 * Creating an action which is dispatched when all the books
 * in the user's catalogue need to be set.
 *
 * @param {Object[]} books An array of object which has all of user's books
 */
export const setUserBooks = (books) => ({
  type: bookActionTypes.SET_USER_BOOKS,
  payload: books,
});

/**
 * Creating an action which is dispatched when all the books
 * in the database need to be set.
 *
 * @param {Object[]} books An array of object which has all books
 */
export const setAllBooks = (books) => ({
  type: bookActionTypes.SET_ALL_BOOKS,
  payload: books,
});
