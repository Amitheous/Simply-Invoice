import React from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavLink,
  Container
} from "reactstrap";
import { NavLink as RouteLink } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { logoutUser } from "../../actions/authActions";

class SecondNav extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <div>
        {isAuthenticated ? (
          <Navbar className="py-0" expand="sm" id="secondNav">
            <Container>
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="mx-auto" navbar>
                  <NavLink
                    className="navLinks px-5"
                    tag={RouteLink}
                    exact
                    to="/dashboard"
                  >
                    Dashboard
                  </NavLink>
                  <NavLink
                    className="navLinks px-5"
                    tag={RouteLink}
                    exact
                    to="/clients"
                  >
                    Clients
                  </NavLink>
                  <NavLink
                    className="navLinks px-5"
                    tag={RouteLink}
                    exact
                    to="/invoices"
                  >
                    Invoices
                  </NavLink>
                  <NavLink
                    className="navLinks px-5"
                    tag={RouteLink}
                    exact
                    to="/bills"
                  >
                    Bills
                  </NavLink>
                </Nav>
              </Collapse>
            </Container>
          </Navbar>
        ) : null}
      </div>
    );
  }
}

SecondNav.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(SecondNav);
