import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

/**
 * Checks if currently a user exists. If yes, then route
 * to the Homepage else route to '/' route
 *
 * @param {HomePage} Component
 * @returns HomePage or '/' path
 */
function PrivateRoute({ component: Component, ...otherProps }) {
  const isUserLoggedIn = useSelector((state) => state.user.currentUser);

  return (
    <Route
      component={() => (isUserLoggedIn ? <Component /> : <Redirect to="/" />)}
      {...otherProps}
    />
  );
}

export default PrivateRoute;
