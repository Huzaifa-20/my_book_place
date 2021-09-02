import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { auth } from './firebase/firebase.utils';

import LogInSignUpPage from './pages/LogIn-SignUp/LogInSignUpPage';
import HomePage from './pages/HomePage/HomePage';
import './App.css';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route
          path="/login-signup"
          /* render={() => (currentUser ? <Redirect to="/" /> : <LogInSignUpPage />)} */
        >
          <LogInSignUpPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
