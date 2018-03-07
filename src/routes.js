import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import LoginPage from './components/login/LoginPage';
import RegisterPage from './components/login/RegisterPage';
import ResumePage from './components/resume/ResumePage';
import NotFoundPage from './components/common/NotFoundPage';
import ManageResumePage from './components/resume/ManageResumePage'; //eslint-disable-line import/no-named-as-default

export default (
  <Route path="/" component={App}>
    <IndexRoute component={LoginPage} />
    <Route path="login" component={LoginPage} />
    <Route path="register" component={RegisterPage} />
    <Route path="index" component={HomePage} >
      <IndexRoute component={ResumePage} />      
      <Route path="resumes" component={ResumePage} />
      <Route path="resume" component={ManageResumePage} />
      <Route path="resume/:id" component={ManageResumePage} />        
    </Route> 
    <Route path="*" component={NotFoundPage}/>      
  </Route>          
);
