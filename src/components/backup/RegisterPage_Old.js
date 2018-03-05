import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as loginActions from '../../actions/loginActions';
import RegisterForm from './RegisterForm';
import toastr from 'toastr';

class RegisterPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            user: {
                firstname: '',
                lastname: '',
                username: '',
                password: ''
            },
            submitted: false,
            errors: {}
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    redirect() {
        this.setState({submitted: false});
        this.context.router.push('/login');
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    registerFormIsValid() {
        let formIsValid = true;
        let errors = {};
        const {user} = this.state;

        if(user.firstname.length === 0)
        {
            errors.firstname = "First name is required.";
            formIsValid = false;
        }

        if(user.lastname.length === 0)
        {
            errors.lastname = "Last name is required.";
            formIsValid = false;
        }

        if(user.username.length === 0)
        {
            errors.username = "Username is required.";
            formIsValid = false;
        }

        if(user.password.length === 0)
        {
            errors.password = "Password is required.";
            formIsValid = false;
        }

        this.setState({errors: errors});
        return formIsValid;
    }
    
    handleSubmit(event) {
        event.preventDefault();

        if(!this.registerFormIsValid())
            return;

        this.setState({ submitted: true });
        const { user } = this.state;
        if (user.firstname && user.lastname && user.username && user.password) {
            this.props.actions.register(user).then(
                () => this.redirect()).catch(error => {                    
                    toastr.error(error); 
                    this.setState({submitted: false});                                       
                });            
        }
    }

    render() {
        return (
            <RegisterForm
                submitted={this.state.submitted}
                user={this.state.user}
                onChange={this.handleChange}
                onSubmit={this.handleSubmit}
                errors={this.state.errors}
            />               
        );
    }
}

RegisterPage.propTypes = {
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return {

    };
}
//Pull in the React Router context so router is available on this.context.router.
RegisterPage.contextTypes = {
    router: PropTypes.object
};

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(loginActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
