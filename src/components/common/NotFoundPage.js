import React from 'react';
import { Link } from 'react-router';

const NotFoundPage = () => {
    return (
        <div>
            <br/><br/>
            <Link to="/index"> <img src={require('./../../images/notfound.jpg')} alt="404 Page" /> </Link>
        </div>
    );
};

export default NotFoundPage;