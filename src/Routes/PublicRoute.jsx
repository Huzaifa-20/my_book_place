import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

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
