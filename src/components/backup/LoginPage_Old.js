import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import * as loginActions from '../../actions/loginActions';
import LoginForm_Old from './../backup/LoginForm_Old';
import toastr from 'toastr';

class LoginPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            username: '',
            password: '',
            submitted: false,
            errors: {}
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        // Redirect user to home page if authenticated
        let isAuth = this.props.actions.isAuthenticated();
        
        if (isAuth)
          browserHistory.replace("/index");
      }

    redirect() {
        this.setState({submitted: false});
        this.context.router.push('/index');
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }
    
    loginFormIsValid() {
        let formIsValid = true;
        let errors = {};

        if(this.state.username.length === 0)
        {
            errors.username = "Username is required..";
            formIsValid = false;
        }

        if(this.state.password.length === 0)
        {
            errors.password = "Password is required.";
            formIsValid = false;
        }

        this.setState({errors: errors});
        return formIsValid;
    }


    handleSubmit(event) {
        event.preventDefault();        

        if(!this.loginFormIsValid())
            return;

        this.setState({ submitted: true });
        const { username, password } = this.state;
        if (username && password) {
            this.props.actions.login(username, password).then(
                () => this.redirect()).catch(error => {                    
                    toastr.error(error); 
                    this.setState({submitted: false});                   
                });
        }
    }

    render() {
        return (            
            <LoginForm_Old
                submitted={this.state.submitted}
                username={this.state.username}
                password={this.state.password}
                onChange={this.handleChange}
                onSubmit={this.handleSubmit}
                errors={this.state.errors}
            />
        );
    }
}

LoginPage.propTypes = {
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return {

    };
}

//Pull in the React Router context so router is available on this.context.router.
LoginPage.contextTypes = {
    router: PropTypes.object
};


function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(loginActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
