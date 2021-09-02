import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import setCurrentUser from './redux/user/userActions';

import LogInSignUpPage from './pages/LogIn-SignUp/LogInSignUpPage';
import HomePage from './pages/HomePage/HomePage';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    const updateCurrentUser = (user) => dispatch(setCurrentUser(user));

    // eslint-disable-next-line prefer-const
    let unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
          updateCurrentUser({ id: snapShot.id, ...snapShot.data() });
        });
      }
      updateCurrentUser(userAuth);
    });
    return () => {
      unsubscribeFromAuth();
    };
  }, [dispatch]);

  return (
    <div>
      <Switch>
        <Route
          exact
          path="/"
          render={() => (currentUser ? (
            <Redirect to="/home" />
          ) : (
            <Redirect to="/login-signup" />
          ))}
        />

        <Route
          exact
          path="/login-signup"
          render={() => (currentUser ? <Redirect to="/home" /> : <LogInSignUpPage />)}
        />

        <Route
          exact
          path="/home"
          render={() => (currentUser ? <HomePage /> : <Redirect to="/login-signup" />)}
        />
      </Switch>
    </div>
  );
}

export default App;
