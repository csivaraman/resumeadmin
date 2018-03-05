import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import LoadingDots from './../common/LoadingDots';

const Header = ({ loading }) => {
  return (
    <nav className="navbar navbar-default" role="navigation">
      <ul className="nav navbar-nav">
        <li className="nav-item">
          <Link to="/index/resumes"> Resume</Link>
        </li>        
      </ul>
      {loading && <LoadingDots interval={100} dots={20} />}
      <ul className="nav navbar-nav navbar-right space-right">
        <li><a>csivaraman</a></li>
      </ul>
    </nav>
  );
};

Header.propTypes = {
  loading: PropTypes.bool.isRequired
};

export default Header;
