import bookActionTypes from './bookTypes';

/**
 * Initial state of allBooks and userBooks arrays
 */
const initialState = {
  allBooks: [],
  userBooks: [],
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
    case bookActionTypes.SET_USER_BOOKS:
      return {
        ...state,
        userBooks: action.payload,
      };
    case bookActionTypes.SET_ALL_BOOKS:
      return {
        ...state,
        allBooks: action.payload,
      };
    default:
      return state;
  }
};

export default booksReducer;
