import React, { PropTypes } from 'react';
import Header from './../nav/Header';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import * as loginActions from '../../actions/loginActions';
import { connect } from 'react-redux';

class HomePage extends React.Component {

  constructor(props, context) {
    super(props, context);        
  }

  componentDidMount() {
    // redirect user to login page if not authenticated
    let isAuth = this.props.actions.isAuthenticated();

    if (!isAuth)
      browserHistory.replace("/login");
  }
  
  render() {
    return (
      <div className="container-fluid">
        <Header loading={this.props.loading}/>
        {this.props.children}
      </div>
    );
  }
}

HomePage.propTypes = {
  children: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    loading: state.ajaxCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(loginActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

