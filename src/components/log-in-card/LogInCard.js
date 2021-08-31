import React, { useState } from 'react';

import FormInput from '../form-input/FormInput';
import CustomButton from '../custom-button/CustomButton';
import './LogInCardStyle.scss';

const LogInCard = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmail('');
    setPassword('');
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    name === 'email' ? setEmail(value) : setPassword(value);
  };

  return (
    <div className="log-in">
      <h1 className="card-heading">Log In</h1>
      <form className="log-in-form" onSubmit={handleSubmit}>
        <FormInput
          name="email"
          type="email"
          value={email}
          label="email"
          handleChange={handleChange}
          required
        />
        <FormInput
          name="password"
          type="password"
          value={password}
          label="password"
          handleChange={handleChange}
          required
        />
      </form>
      <CustomButton onClick={handleSubmit}>Sign in</CustomButton>
      <p>OR</p>
      <CustomButton>Sign in with Google</CustomButton>
    </div>
  );
};

export default LogInCard;
