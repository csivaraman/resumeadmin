import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory, Link } from 'react-router';

import * as loginActions from '../../actions/loginActions';
import LoginForm from './LoginForm';

class LoginPage extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        // Redirect user to home page if authenticated
        let authUser = this.props.actions.getAuthenticatedUser();

        if (authUser && authUser.username)
            browserHistory.replace("/index");
    }

    render() {
        return (
            <div className="row">
                <Link id="registerLink" to="/register" className="btn btn-primary pull-right">Register</Link>
                <LoginForm />
            </div>
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

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(loginActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
