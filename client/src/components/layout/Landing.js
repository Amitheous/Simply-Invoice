import React, { Component } from "react";
import { Container, Card, Button } from "reactstrap";
import { NavLink as RouteLink } from "react-router-dom";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
  render() {
    return (
      <div className="landing">
        <div className="landing-inner pt-5">
          <Container>
            <Card id="landingCard" className="py-4">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">Simply Invoice</h1>
                <p className="lead">
                  An easier way to manage clients, invoices, and bills.
                </p>
                <hr />
                <Button
                  tag={RouteLink}
                  exact
                  to="/register"
                  size="lg"
                  color="success"
                  className="mr-2"
                >
                  Sign Up
                </Button>
                <Button
                  tag={RouteLink}
                  exact
                  to="/login"
                  size="lg"
                  color="primary"
                >
                  Login
                </Button>
              </div>
            </Card>
          </Container>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
