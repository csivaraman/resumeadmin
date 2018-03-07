import React, { PropTypes } from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { connect } from 'react-redux';
import * as loginActions from '../../actions/loginActions';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import toastr from 'toastr';
import TextInput from './../common/TextInput';
import { required, passwordMatch } from './../common/Validators';

class RegisterForm extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.onSubmit = this.onSubmit.bind(this);
    }

    registerFormIsValid(user) {        
        let error = passwordMatch(user);                
        if(error && error.length > 0)
            throw new SubmissionError({_error: error});        
        
        return true;
    }        

    onSubmit(user) {
        const { firstname, lastname, username, password, passwordConfirm } = user;

        if (!this.registerFormIsValid(user))
            return;

        if (firstname && lastname && username && password && passwordConfirm) {
            return this.props.actions.register(user).then(
                () => this.redirect()).catch(error => {                    
                    toastr.error(error);                    
                });
        }
    }
    redirect() {
        this.context.router.push('/login');
    }

    render() {
        const { error, handleSubmit, pristine, submitting } = this.props;

        return (
            <form id="registerform" onSubmit={handleSubmit(this.onSubmit)}>
                <h1>Register</h1>
                <Field
                    label="First Name"
                    name="firstname"
                    component={TextInput}
                    type="text"
                    placeholder="john"
                    validate={required}
                />
                <Field
                    label="Last Name"
                    name="lastname"
                    component={TextInput}
                    type="text"
                    placeholder="doe"
                    validate={required}
                />
                <Field
                    label="Username"
                    name="username"
                    component={TextInput}
                    type="text"
                    placeholder="johndoe"
                    validate={required}
                />
                <Field
                    label="Password"
                    name="password"
                    component={TextInput}
                    type="password"
                    validate={required}
                />
                <Field
                    label="Confirm Password"
                    name="passwordConfirm"
                    component={TextInput}
                    type="password"
                    validate={required}
                />

                <div>
                    {error && <div className="alert alert-danger">{error}</div>}
                </div>
                <div className="form-group">
                    <input
                        type="submit"
                        disabled={pristine || submitting}
                        value={submitting ? 'Creating User...' : 'Register'}
                        className="btn btn-primary"
                    />
                </div>
            </form>
        );
    }
}

RegisterForm.propTypes = {
    error: PropTypes.object.isRequired,
    pristine: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,    
    submitting: PropTypes.bool.isRequired,
    actions: PropTypes.object.isRequired
};

//Pull in the React Router context so router is available on this.context.router.
RegisterForm.contextTypes = {
    router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
    return {

    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(loginActions, dispatch)
    };
}

const RegisterFormRedux = connect(mapStateToProps, mapDispatchToProps)(RegisterForm);

export default reduxForm({
    form: 'registerForm' // a unique identifier for this form
})(RegisterFormRedux);

