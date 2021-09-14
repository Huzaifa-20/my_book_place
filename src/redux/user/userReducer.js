import userActionTypes from './userTypes';

const initialState = {
  currentUser: null,
};

/**
 * Reducer changes state of redux store depending
 * on the action it receives
 */
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
