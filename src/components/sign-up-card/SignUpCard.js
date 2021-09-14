import { useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';
import FormInput from '../form-input/FormInput';
import CustomButton from '../custom-button/CustomButton';
import './SignUpCardStyle.scss';

const SignUpCard = () => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Function that signs up a new user and
   * shows a loader while user is being created
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    try {
      setIsLoading(true);
      const { user } = email && password
        ? await auth
          .createUserWithEmailAndPassword(email, password)
          .catch((error) => {
            alert(error);
          })
        : alert('Fill all fields');

      createUserProfileDocument(user, { displayName });
    } catch (error) {
      console.error(error);
    }

    setDisplayName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setIsLoading(false);
  };

  /**
   * Function that changes the values of the input fields
   * as we type in them
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'displayName') setDisplayName(value);
    else if (name === 'email') setEmail(value);
    else if (name === 'password') setPassword(value);
    else if (name === 'confirmPassword') setConfirmPassword(value);
  };

  return (
    <div className="sign-up">
      <h1 className="card-heading">Sign Up</h1>
      <ClipLoader color="#ffffff" loading={isLoading} />
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <FormInput
          type="text"
          name="displayName"
          value={displayName}
          handleChange={handleChange}
          label="Display Name"
          disableInput={isLoading}
          required
        />
        <FormInput
          type="email"
          name="email"
          value={email}
          handleChange={handleChange}
          label="Email"
          disableInput={isLoading}
          required
        />
        <FormInput
          type="password"
          name="password"
          value={password}
          handleChange={handleChange}
          label="Pasword"
          disableInput={isLoading}
          required
        />
        <FormInput
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          handleChange={handleChange}
          label="Confirm Pasword"
          disableInput={isLoading}
          required
        />
      </form>
      <CustomButton disableBtn={isLoading} onClick={handleSubmit}>
        Sign Up
      </CustomButton>
    </div>
  );
};

export default SignUpCard;
