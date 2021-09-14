import { useState } from 'react';

import CustomButton from '../../components/custom-button/CustomButton';
import LogInCard from '../../components/log-in-card/LogInCard';
import SignUpCard from '../../components/sign-up-card/SignUpCard';
import './LogInSignUpPageStyle.scss';

const LogInSignUpPage = () => {
  const [buttonActive, setButtonActive] = useState(0);

  return (
    <div className="background">
      <h1 className={`${buttonActive !== 0 ? 'move-heading-top' : ''} heading`}>
        My Book Place
      </h1>
      <div className="log-in-sign-up">
        <div
          className={`${
            buttonActive !== 0 ? 'move-btn-left' : ''
          } log-in-btn-container`}
        >
          <CustomButton
            onClick={() => {
              buttonActive === 1 ? setButtonActive(0) : setButtonActive(1);
            }}
            type="button"
            selected={buttonActive === 1}
          >
            Log In
          </CustomButton>
        </div>

        <div className="cardContainer">
          <div className={`${buttonActive === 1 ? 'show' : ''} logInContainer`}>
            <LogInCard />
          </div>
          <div
            className={`${buttonActive === 2 ? 'show' : ''} signUpContainer`}
          >
            <SignUpCard />
          </div>
        </div>

        <div
          className={`${
            buttonActive !== 0 ? 'move-btn-right' : ''
          } sign-up-btn-container`}
        >
          <CustomButton
            onClick={() => {
              buttonActive === 2 ? setButtonActive(0) : setButtonActive(2);
            }}
            type="button"
            selected={buttonActive === 2}
          >
            Sign Up
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default LogInSignUpPage;
