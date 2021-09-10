import bookActionTypes from './bookTypes';

/**
 * Initial state of allBooks and userBooks arrays
 */
const initialState = {
  allBooks: [],
  userBooks: [],
  isFetchingAllBooks: false,
  isFetchingUserBooks: false,
};

/**
 * Reducer changes state of redux store depending
 * on the action it receives
 *
 * @param {Object} state
 * @param {bookActionTypes} action Tells reducer how to manipulate redux store
 * @returns latest state
 */
const booksReducer = (state = initialState, action) => {
  switch (action.type) {
    case bookActionTypes.FETCH_ALL_BOOKS_START:
      return {
        ...state,
        isFetchingAllBooks: true,
      };

    case bookActionTypes.FETCH_ALL_BOOKS_SUCCESS:
      return {
        ...state,
        isFetchingAllBooks: false,
        allBooks: action.payload,
      };

    case bookActionTypes.FETCH_USER_BOOKS_START:
      return {
        ...state,
        isFetchingUserBooks: true,
      };

    case bookActionTypes.FETCH_USER_BOOKS_SUCCESS:
      return {
        ...state,
        isFetchingUserBooks: false,
        userBooks: action.payload,
      };

    default:
      return state;
  }
};

export default booksReducer;
