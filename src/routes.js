import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import LoginPage from './components/login/LoginPage';
import RegisterPage from './components/login/RegisterPage';
import ResumePage from './components/resume/ResumePage';
import CoursesPage from './components/course/CoursesPage';
import NotFoundPage from './components/common/NotFoundPage';
import ManageCoursePage from './components/course/ManageCoursePage'; //eslint-disable-line import/no-named-as-default
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
      <Route path="courses" component={CoursesPage} />
      <Route path="course" component={ManageCoursePage} />
      <Route path="course/:id" component={ManageCoursePage} />         
    </Route> 
    <Route path="*" component={NotFoundPage}/>      
  </Route>          
);
