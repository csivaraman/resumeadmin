import {React,PropTypes} from 'react';
import { Link } from 'react-router';
import TextInput from '../common/TextInput';

const RegisterForm_Old = ({ submitted, user, onSubmit, onChange, errors }) => {
    return (
        <form id="registerform">
            <h1>Register</h1>
            
            <TextInput
                name="firstname"
                label="First Name"
                value={user.firstname}
                onChange={onChange}
                error={errors.firstname} />

            <TextInput
                name="lastname"
                label="Last Name"
                value={user.lastname}
                onChange={onChange}
                error={errors.lastname} />

            <TextInput
                name="username"
                label="Username"
                value={user.username}
                onChange={onChange}
                error={errors.username} />

            <TextInput
                name="password"
                label="Password"
                type="password"
                value={user.password}
                onChange={onChange}
                error={errors.password} />

            <div className="form-group">
                <input
                    type="submit"
                    disabled={submitted}
                    value={submitted ? 'Registering...' : 'Register'}
                    className="btn btn-primary"
                    onClick={onSubmit} />

                <Link to="/login" className="btn btn-link">Cancel</Link>
            </div>

        </form>
    );
};

RegisterForm_Old.propTypes = {
    submitted: PropTypes.bool,
    user: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    errors: PropTypes.object
};

export default RegisterForm_Old;
