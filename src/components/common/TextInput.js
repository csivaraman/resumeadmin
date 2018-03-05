import React, { PropTypes } from 'react';

const TextInput = ({ input, label, type, placeholder, meta: { touched, error } }) => {

    let wrapperClass = 'form-group';    
    if (error && error.length > 0) {
        wrapperClass += " " + 'has-error';
    }

    return (
        <div className={wrapperClass}>
            <label htmlFor={input.name}>{label}</label>
            <div className="field">
                <input {...input} type = {type} className="form-control"
                    placeholder={placeholder} />
                {touched && error && <div className="alert alert-danger">{error}</div>}
            </div>
        </div>
    );
};

TextInput.propTypes = {
    input: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    meta: PropTypes.object.isRequired
};

export default TextInput;
