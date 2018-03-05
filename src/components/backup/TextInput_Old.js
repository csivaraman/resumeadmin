import React, {PropTypes} from 'react';

const TextInput_Old = ({name, label, type, onChange, placeholder, autofocus, value, required, error}) => {
  let wrapperClass = 'form-group';
  if (error && error.length > 0) {
    wrapperClass += " " + 'has-error';
  }

  return (
    <div className={wrapperClass}>
      <label htmlFor={name}>{label}</label>
      <div className="field">
        <input
          type={type}
          name={name}
          className="form-control"
          placeholder={placeholder}
          autoFocus={autofocus}
          value={value}
          onChange={onChange}
          required={required || "false"} />
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </div>
  );
};

TextInput_Old.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  autofocus: PropTypes.string,
  value: PropTypes.string,
  required: PropTypes.string,
  error: PropTypes.string
};

export default TextInput_Old;
