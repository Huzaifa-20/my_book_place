import React, { useState } from 'react';

import CustomButton from '../../components/custom-button/CustomButton';
import LogInCard from '../../components/log-in-card/LogInCard';
import SignUpCard from '../../components/sign-up-card/SignUpCard';
import './LogInSignUpPageStyle.scss';

const LogInSignUpPage = () => {
  const [logInSelected, setLogInSelected] = useState(false);
  const [signUpSelected, setSignUpSelected] = useState(false);
  const [showLogInCard, setShowLogInCard] = useState(false);
  const [showSignUpCard, setShowSignUpCard] = useState(false);

  const toggleLogIn = () => {
    setLogInSelected(!logInSelected);
    setShowLogInCard(!showLogInCard);
  };

  const toggleSignUp = () => {
    setSignUpSelected(!signUpSelected);

    setShowSignUpCard(!showSignUpCard);
  };

  const toggleSelections = () => {
    toggleLogIn();
    toggleSignUp();
  };

  const clickHandler = (event) => {
    if (event === 'LogIn') {
      if (logInSelected && showLogInCard) {
        setLogInSelected(!logInSelected);
        setShowLogInCard(!showLogInCard);
      } else if (logInSelected) {
        setLogInSelected(!logInSelected);
      } else if (signUpSelected) {
        toggleSelections();
      } else {
        toggleLogIn();
      }
    } else if (event === 'SignUp') {
      if (signUpSelected && showSignUpCard) {
        setSignUpSelected(!signUpSelected);
        setShowSignUpCard(!showSignUpCard);
      } else if (signUpSelected) {
        setSignUpSelected(!signUpSelected);
      } else if (logInSelected) {
        toggleSelections();
      } else {
        toggleSignUp();
      }
    }
  };

  return (
    <div className="background">
      <h1 className="heading">My Book Place</h1>
      <div className="log-in-sign-up">
        <CustomButton
          onClick={() => {
            clickHandler('LogIn');
          }}
          type="button"
          selected={logInSelected}
        >
          Log In
        </CustomButton>
        <div className={`${showLogInCard ? 'show' : ''} logInContainer`}>
          <LogInCard />
        </div>
        <div className={`${showSignUpCard ? 'show' : ''} signUpContainer`}>
          <SignUpCard />
        </div>

        {/* {showLogInCard ? <LogInCard /> : <div />}

        {showSignUpCard ? <SignUpCard /> : <div />} */}

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
  );
};

export default LogInSignUpPage;
