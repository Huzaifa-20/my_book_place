import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

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
