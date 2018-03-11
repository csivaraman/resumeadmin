import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as loginActions from '../../actions/loginActions';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import TextInput from './../common/TextInput';
import { required } from './../common/Validators';

class LoginForm extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(user) {
        const { username, password } = user;
        if (username && password) {
            return this.props.actions.login(username, password).then(
                () => this.redirect()).catch(error => {
                    toastr.error(error);
                });
        }
    }

    redirect() {
        this.context.router.push('/index');
    }

    render() {
        const { error, handleSubmit, pristine, submitting } = this.props;

        return (
            <form id="loginform" onSubmit={handleSubmit(this.onSubmit)}>
                <h1>Login</h1>
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
                <div>
                    {error && <div className="alert alert-danger">{error}</div>}
                </div>
                <div className="form-group">
                    <input
                        type="submit"
                        disabled={pristine || submitting}
                        value={submitting ? 'Logging In...' : 'Login'}
                        className="btn btn-primary"
                    />                    
                </div>
            </form>
        );
    }
}

LoginForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,   
    submitting: PropTypes.bool.isRequired,
    error: PropTypes.object,
    actions: PropTypes.object.isRequired

};

//Pull in the React Router context so router is available on this.context.router.
LoginForm.contextTypes = {
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

const LoginFormRedux = connect(mapStateToProps, mapDispatchToProps)(LoginForm);

export default reduxForm({
    form: 'loginForm' // a unique identifier for this form
})(LoginFormRedux);