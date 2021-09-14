import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

/**
 * Checks if currently a user exists. If no, then route
 * to the LogInSignUpPage else route to '/home' route
 */
function PublicRoute({ component: Component, ...otherProps }) {
  const isAuthenticated = useSelector((state) => state.user.currentUser);

  return (
    <Route
      {...otherProps}
      component={() =>
        isAuthenticated ? <Redirect to="/home" /> : <Component />
      }
    />
  );
}

export default PublicRoute;
