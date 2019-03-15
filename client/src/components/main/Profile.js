import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProfile, createProfile } from "../../actions/profileActions";

import {
  Container,
  Card,
  CardSubtitle,
  CardTitle,
  Form,
  Row,
  Label,
  Input
} from "reactstrap";
class Profile extends Component {
  state = {
    organizationName: "",
    name: "",
    email: "",
    website: "",
    phone: "",
    defaultTax: 0,
    address: "",
    zipCode: "",
    state: "",
    city: ""
  };

  componentWillMount() {
    this.props.getProfile();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile) {
      const { profile } = nextProps.profile;
      this.setState({
        organizationName: profile.organizationName || "",
        name: profile.name || "",
        email: profile.email || "",
        website: profile.website || "",
        phone: profile.phone || "",
        defaultTax: Number(profile.defaultTax * 100) || 0,
        address: profile.location.address || "",
        zipCode: profile.location.zipCode || "",
        state: profile.location.state || "",
        city: profile.location.city || ""
      });
    }
  }

  render() {
    return (
      <Container className="mx-auto my-4">
        <div className="col-lg-12">
          <Card body color="success">
            <CardTitle className="text-center text-white">
              <h2>Profile</h2>
            </CardTitle>
            <Form noValidate onSubmit={this.onSubmit}>
              <Card body className="mb-3">
                <Row>
                  <div className="col-6 px-3 text-center">
                    <Label for="organizationName">
                      <h5>Organization Name</h5>
                    </Label>
                    <Input
                      type="text"
                      name="organizationName"
                      value={this.state.organizationName}
                      onChange={this.onChange}
                    />
                  </div>

                  <div className="col-6 px-3 text-center">
                    <Label for="name">
                      <h5>Name</h5>
                    </Label>
                    <Input
                      type="text"
                      name="name"
                      value={this.state.name}
                      onChange={this.onChange}
                    />
                  </div>
                </Row>

                <Row className="mt-3">
                  <div className="col-6 px-3 text-center">
                    <Label for="email">
                      <h5>Email</h5>
                    </Label>
                    <Input
                      type="text"
                      name="email"
                      value={this.state.email}
                      onChange={this.onChange}
                    />
                  </div>

                  <div className="col-6 px-3 text-center">
                    <Label for="website">
                      <h5>Website</h5>
                    </Label>
                    <Input
                      type="text"
                      name="website"
                      value={this.state.website}
                      onChange={this.onChange}
                    />
                  </div>
                </Row>

                <Row className="mt-3">
                  <div className="col-6 px-3 text-center">
                    <Label for="phone">
                      <h5>Phone</h5>
                    </Label>
                    <Input
                      type="text"
                      name="phone"
                      value={this.state.phone}
                      onChange={this.onChange}
                    />
                  </div>

                  <div className="col-6 px-3 text-center">
                    <Label for="defaultTax">
                      <h5>Default Tax %</h5>
                    </Label>
                    <Input
                      type="number"
                      step={0.1}
                      name="defaultTax"
                      value={this.state.defaultTax}
                      onChange={this.onChange}
                    />
                  </div>
                </Row>
                <Card body className="mt-3 border-success">
                  <CardSubtitle className="text-center">
                    <h4>Location</h4>
                  </CardSubtitle>

                  <Row>
                    <div className="col-6 px-3 text-center">
                      <Label for="address">
                        <h5>Address</h5>
                      </Label>
                      <Input
                        type="text"
                        name="address"
                        value={this.state.address}
                        onChange={this.onChange}
                      />
                    </div>

                    <div className="col-6 px-3 text-center">
                      <Label for="zipCode">
                        <h5>Zip Code</h5>
                      </Label>
                      <Input
                        type="text"
                        name="zipCode"
                        value={this.state.zipCode}
                        onChange={this.onChange}
                      />
                    </div>
                  </Row>

                  <Row className="mt-3">
                    <div className="col-6 px-3 text-center">
                      <Label for="city">
                        <h5>City</h5>
                      </Label>
                      <Input
                        type="text"
                        name="city"
                        value={this.state.city}
                        onChange={this.onChange}
                      />
                    </div>

                    <div className="col-6 px-3 text-center">
                      <Label for="state">
                        <h5>State</h5>
                      </Label>
                      <Input
                        type="text"
                        name="state"
                        value={this.state.state}
                        onChange={this.onChange}
                      />
                    </div>
                  </Row>
                </Card>
              </Card>
              <div className="col-md-6 offset-3">
                <Input type="submit" value="Save" className=" btn btn-info" />
              </div>
            </Form>
          </Card>
        </div>
      </Container>
    );
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const profileData = {
      name: this.state.name,
      organizationName: this.state.organizationName,
      email: this.state.email,
      website: this.state.website,
      phone: this.state.phone,
      defaultTax: this.state.defaultTax / 100,
      location: {
        address: this.state.address,
        city: this.state.city,
        state: this.state.state,
        zipCode: this.state.zipCode
      }
    };

    this.props.createProfile(profileData, this.props.history);
  };
}

Profile.propTypes = {
  profile: PropTypes.object,
  errors: PropTypes.object.isRequired,
  getProfile: PropTypes.func,
  createProfile: PropTypes.func
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getProfile, createProfile }
)(Profile);
