import { useState } from 'react';

import CustomButton from '../../components/custom-button/CustomButton';
import LogInCard from '../../components/log-in-card/LogInCard';
import SignUpCard from '../../components/sign-up-card/SignUpCard';
import './LogInSignUpPageStyle.scss';

const LogInSignUpPage = () => {
  /**
   * All state variables required by component
   */
  const [logInSelected, setLogInSelected] = useState(false);
  const [signUpSelected, setSignUpSelected] = useState(false);
  const [showLogInCard, setShowLogInCard] = useState(false);
  const [showSignUpCard, setShowSignUpCard] = useState(false);

  /**
   * Function to toggle the state of the
   * log-in button
   */
  const toggleLogIn = () => {
    setLogInSelected(!logInSelected);
    setShowLogInCard(!showLogInCard);
  };

  /**
   * Function to toggle the state of the
   * sign-up button
   */
  const toggleSignUp = () => {
    setSignUpSelected(!signUpSelected);
    setShowSignUpCard(!showSignUpCard);
  };

  /**
   * Function to simultaneously toggle the states
   * of the sign-up and log-in buttons
   */
  const toggleSelections = () => {
    toggleLogIn();
    toggleSignUp();
  };

  /**
   * Function helps in handling states of the log-in
   * and sign-up buttons in order to maintain UI
   *
   * @param {string} event Tells if log-in or sign-up button was clicked
   */
  const clickHandler = (event) => {
    event === 'LogIn'
      ? logInSelected && showLogInCard
        ? toggleLogIn()
        : signUpSelected
          ? toggleSelections()
          : toggleLogIn()
      : event === 'SignUp'
        ? signUpSelected && showSignUpCard
          ? toggleSignUp()
          : logInSelected
            ? toggleSelections()
            : toggleSignUp()
        : null;
  };

  return (
    <div className="background">
      <h1
        className={`${
          showLogInCard || showSignUpCard ? 'move-heading-top' : ''
        } heading`}
      >
        My Book Place
      </h1>
      <div className="log-in-sign-up">
        <div
          className={`${
            showLogInCard || showSignUpCard ? 'move-btn-left' : ''
          } log-in-btn-container`}
        >
          <CustomButton
            onClick={() => {
              clickHandler('LogIn');
            }}
            type="button"
            selected={logInSelected}
          >
            Log In
          </CustomButton>
        </div>

        <div className="cardContainer">
          <div className={`${showLogInCard ? 'show' : ''} logInContainer`}>
            <LogInCard />
          </div>
          <div className={`${showSignUpCard ? 'show' : ''} signUpContainer`}>
            <SignUpCard />
          </div>
        </div>

        <div
          className={`${
            showLogInCard || showSignUpCard ? 'move-btn-right' : ''
          } sign-up-btn-container`}
        >
          <CustomButton
            onClick={() => {
              clickHandler('SignUp');
            }}
            type="button"
            selected={signUpSelected}
          >
            Sign Up
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default LogInSignUpPage;
