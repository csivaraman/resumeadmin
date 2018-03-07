import React, { PropTypes } from 'react';
import RegisterForm from './RegisterForm';

class RegisterPage extends React.Component {
    constructor(props, context) {
        super(props, context);        
    }
        
    render() {
        return (
            <RegisterForm />                                         
        );
    }
}


export default RegisterPage;
