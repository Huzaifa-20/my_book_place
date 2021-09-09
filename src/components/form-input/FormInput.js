import './FormInputStyle.scss';

const FormInput = ({
  handleChange, label, disableInput, ...otherProps
}) => (
  <div className="group">
    <input
      className="form-input"
      onChange={handleChange}
      {...otherProps}
      disabled={`${disableInput ? 'true' : ''}`}
    />
    {label ? (
      <label
        className={`${
          otherProps.value.length ? 'shrink' : ''
        } form-input-label`}
      >
        {label}
      </label>
    ) : null}
  </div>
);

export default FormInput;
