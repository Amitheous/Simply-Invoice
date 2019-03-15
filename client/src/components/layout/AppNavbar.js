import React from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container
} from "reactstrap";
import { NavLink as RouteLink } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { logoutUser } from "../../actions/authActions";

class AppNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isAdmin: false
    };
  }

  componentWillMount() {
    if (this.props.auth.user.admin === true && this.state.isAdmin === false) {
      this.setState({ isAdmin: true });
    } else if (this.props.auth.user.admin === false) {
      this.setState({ isAdmin: false });
    }
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    const { isAdmin } = this.state;
    const authLinks = (
      <Nav className="ml-auto" navbar>
        {isAdmin ? (
          <NavItem>
            <NavLink tag={RouteLink} exact to="/analytics">
              Analytics
            </NavLink>
          </NavItem>
        ) : null}

        <NavItem>
          <NavLink tag={RouteLink} exact to="/profile">
            Profile
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            tag={RouteLink}
            exact
            to="/"
            onClick={this.onLogoutClick.bind(this)}
          >
            Logout
          </NavLink>
        </NavItem>
      </Nav>
    );

    const guestLinks = (
      <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink tag={RouteLink} exact to="/register">
            Sign Up
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={RouteLink} exact to="/login">
            Login
          </NavLink>
        </NavItem>
      </Nav>
    );

    return (
      <Navbar
        color="success"
        dark
        expand={isAuthenticated ? true : "md"}
        id="navbar"
      >
        <Container>
          <NavbarBrand tag={RouteLink} exact to="/">
            Simply Invoice
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />

          <Collapse isOpen={this.state.isOpen} navbar>
            {isAuthenticated ? authLinks : guestLinks}
          </Collapse>
        </Container>
      </Navbar>
    );
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };
  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
  }
}

AppNavbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(AppNavbar);
