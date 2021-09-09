import { useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

import { auth, signInWithGoogle } from '../../firebase/firebase.utils';
import FormInput from '../form-input/FormInput';
import CustomButton from '../custom-button/CustomButton';
import './LogInCardStyle.scss';

const LogInCard = () => {
  /**
   * State variables required in this component  and
   * shows a loader while user is being logged in
   */
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Function that logs in a user
   *
   * @param {Event} e
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      email && password
        ? await auth
          .signInWithEmailAndPassword(email, password)
          .catch((error) => {
            alert(error);
          })
        : alert('Fill all fields');

      setEmail('');
      setPassword('');
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Function that changes the values of the input fields
   * as we type in them
   *
   * @param {Event} e
   */
  const handleChange = (e) => {
    const { value, name } = e.target;
    name === 'email' ? setEmail(value) : setPassword(value);
  };

  return (
    <div className="log-in">
      <h1 className="card-heading">Log In</h1>
      <ClipLoader color="#ffffff" loading={isLoading} />
      <form className="log-in-form" onSubmit={handleSubmit}>
        <FormInput
          name="email"
          type="email"
          value={email}
          label="email"
          handleChange={handleChange}
          disableInput={isLoading}
          required
        />
        <FormInput
          name="password"
          type="password"
          value={password}
          label="password"
          handleChange={handleChange}
          disableInput={isLoading}
          required
        />
      </form>
      <CustomButton disableBtn={isLoading} onClick={handleSubmit}>
        Sign in
      </CustomButton>
      <p>OR</p>
      <CustomButton disableBtn={isLoading} onClick={signInWithGoogle}>
        Sign in with Google
      </CustomButton>
    </div>
  );
};

export default LogInCard;
