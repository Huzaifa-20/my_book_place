import React from 'react';
import './CustomButtonStyle.scss';

const CustomButton = ({ children, selected, ...otherProps }) => (
  <button
    className={`${selected ? 'selected' : ''} custom-button`}
    {...otherProps}
  >
    {children}
  </button>
);

export default CustomButton;
