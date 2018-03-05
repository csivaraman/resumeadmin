import React from 'react';
import { Link } from 'react-router';
import TextInput from '../common/TextInput';

const LoginForm = ({ submitted, username, password, onSubmit, onChange, errors }) => {
    return (
        <form id="loginform">
            <h1>Login</h1>
            <TextInput
                name="username"
                label="Username"
                value={username}
                onChange={onChange}
                error={errors.username} />

            <TextInput
                name="password"
                label="Password"
                type="password"                
                value={password}
                onChange={onChange}
                error={errors.password} />


            <div className="form-group">
                <input
                    type="submit"
                    disabled={submitted}
                    value={submitted ? 'Logging In...' : 'Login'}
                    className="btn btn-primary"
                    onClick={onSubmit} />

                <Link to="/register" className="btn btn-link">Register</Link>
            </div>

        </form>
    );
};

LoginForm.propTypes = {
    submitted: PropTypes.bool,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    errors: PropTypes.object
};

export default LoginForm;
