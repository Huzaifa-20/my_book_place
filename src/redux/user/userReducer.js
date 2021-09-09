import userActionTypes from './userTypes';

/**
 * Initial state of user object
 */
const initialState = {
  currentUser: null,
};

/**
 * Reducer changes state of redux store depending
 * on the action it receives
 *
 * @param {Object} state
 * @param {userActionTypes} action Tells reducer how to manipulate redux store
 * @returns latest state
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
