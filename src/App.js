import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import WithSpinner from './components/with-spinner/WithSpinner';
import setCurrentUser from './redux/user/userActions';
import PrivateRoute from './Routes/PrivateRoute';
import PublicRoute from './Routes/PublicRoute';

import LogInSignUpPage from './pages/LogIn-SignUp/LogInSignUpPage';
import HomePage from './pages/HomePage/HomePage';
import './App.css';

const LogInSignUpWithSpinner = WithSpinner(LogInSignUpPage);
const HomeWithSpinner = WithSpinner(HomePage);

function App() {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    const updateCurrentUser = (user) => dispatch(setCurrentUser(user));

    const unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
          updateCurrentUser({ id: snapShot.id, ...snapShot.data() });
        });
      }
      updateCurrentUser(userAuth);
      setLoading(false);
    });
    return () => {
      unsubscribeFromAuth();
    };
  }, [dispatch]);

  return (
    <div>
      <Switch>
        <PrivateRoute path="/home" component={HomePage} />
        <PublicRoute exact path="/" component={LogInSignUpPage} />
      </Switch>
    </div>
  );
}

export default App;
