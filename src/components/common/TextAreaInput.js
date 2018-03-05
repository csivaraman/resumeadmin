import React, {PropTypes} from 'react';

const TextAreaInput = ({name, label, rows, onChange, placeholder, autofocus, value, required, error}) => {
  let wrapperClass = 'form-group';
  if (error && error.length > 0) {
    wrapperClass += " " + 'has-error';
  }

  return (
    <div className={wrapperClass}>
      <label htmlFor={name}>{label}</label>
      <div className="field">
      <textarea 
        name={name} 
        className="form-control"
        placeholder={placeholder}
        autoFocus={autofocus}
        rows={rows || "5"}        
        onChange={onChange}
        value={value} 
        required={required || "false"}/>           
        
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </div>
  );
};

TextAreaInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  rows: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  autofocus: PropTypes.string,
  value: PropTypes.string,
  required: PropTypes.string,
  error: PropTypes.string
};

export default TextAreaInput;
