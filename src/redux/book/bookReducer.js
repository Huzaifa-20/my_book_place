import bookActionTypes from './bookTypes';

const initialState = {
  allBooks: [],
  userBooks: [],
};

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
