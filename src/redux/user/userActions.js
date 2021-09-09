import userActionTypes from './userTypes';

/**
 * Creating an action which is dispatched whenever a user
 * logs in or sign up. This action helps store the user information
 * in redux store
 *
 * @param {Object} user An object which has all user details
 */
const setCurrentUser = (user) => ({
  type: userActionTypes.SET_CURRENT_USER,
  payload: user,
});

export default setCurrentUser;
