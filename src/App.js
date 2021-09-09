import { useEffect, useState } from 'react';
import { Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import WithSpinner from './components/with-spinner/WithSpinner';
import setCurrentUser from './redux/user/userActions';
import PrivateRoute from './Routes/PrivateRoute';
import PublicRoute from './Routes/PublicRoute';
import LogInSignUpPage from './pages/LogIn-SignUp/LogInSignUpPage';
import HomePage from './pages/HomePage/HomePage';
import './App.css';

/**
 * LogInSignUpPage and HomePage are converted to LogInSignUpWithSpinner
 * and HomeWithSpinner respectively to enable a loader to appear
 * whenever navigating between the pages takes long due to network issues.
 */
const LogInSignUpWithSpinner = WithSpinner(LogInSignUpPage);
const HomeWithSpinner = WithSpinner(HomePage);

function App() {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  /**
   * Functionality of looking out for change in state of currently
   * logged in user is implemented here. It allows us to navigate between
   * login/signup page and homepage with regards to current user being logged
   * in or logged out
   */
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
        <PrivateRoute
          path="/home"
          component={(props) => (
            <HomeWithSpinner isLoading={loading} {...props} />
          )}
        />
        <PublicRoute
          exact
          path="/"
          component={(props) => (
            <LogInSignUpWithSpinner isLoading={loading} {...props} />
          )}
        />
      </Switch>
    </div>
  );
}

export default App;
