import userActionTypes from './userTypes';

/**
 * Creating an action which is dispatched whenever a user
 * logs in or sign up. This action helps store the user information
 * in redux store
 */
const setCurrentUser = (user) => ({
  type: userActionTypes.SET_CURRENT_USER,
  payload: user,
});

export default setCurrentUser;
