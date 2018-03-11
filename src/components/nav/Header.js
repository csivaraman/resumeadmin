import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import LoadingDots from './../common/LoadingDots';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

const Header = ({ loading, onLogout, user }) => {
  return (
    <Navbar collapseOnSelect fluid staticTop>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to="/">Resume Admin</Link>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav>
          <NavItem>
            <Link to="/index/resumes"> Resumes </Link>
          </NavItem>
          <NavItem eventKey={2}>
            {loading=='true' && <LoadingDots interval={100} dots={20} />}
          </NavItem>
        </Nav>
        <Nav pullRight>
          <NavDropdown eventKey={3} title={user?user.username:'NOT FOUND'} id="basic-nav-dropdown">
            <MenuItem eventKey={3.1} onClick={onLogout}>
              Logout
            </MenuItem>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>  
  );
};

Header.propTypes = {
  loading: PropTypes.bool.isRequired,
  onLogout: PropTypes.func,
  user: PropTypes.object.isRequired
};

export default Header;
