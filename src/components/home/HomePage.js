import React, { PropTypes } from 'react';
import Header from './../nav/Header';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as loginActions from '../../actions/loginActions';
import toastr from 'toastr';

class HomePage extends React.Component {

  constructor(props, context) {
    super(props, context);    

    this.state = {
      user: {}
    };

    this.doLogOut = this.doLogOut.bind(this);
  }

  componentWillMount() {
    // redirect user to login page if not authenticated
    let authUser = this.props.actions.getAuthenticatedUser();    

    if (!authUser || !authUser.username)
      this.context.router.push('/Login');

    this.setState({user: authUser});
  }

  doLogOut(event) {

    event.preventDefault();

    this.props.actions.logout().then(() => {
      this.context.router.push('/');
    }).catch(error => {

    });
  }

  render() {    
    return (           
      <div className="container-fluid">        
        <Header loading={this.props.loading} onLogout={this.doLogOut} user={this.state.user} />
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

//Pull in the React Router context so router is available on this.context.router.
HomePage.contextTypes = {
  router: PropTypes.object
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

