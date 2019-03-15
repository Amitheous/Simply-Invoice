import React, { Component } from "react";
import { connect } from "react-redux";
import { createClient } from "../../../actions/clientActions";
import PropTypes from "prop-types";
import {
  Container,
  Card,
  CardTitle,
  CardSubtitle,
  Form,
  Input,
  Label,
  Row
} from "reactstrap";

class CreateClient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      organizationName: "",
      email: "",
      website: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      notes: "",
      errors: {}
    };
  }

  render() {
    return (
      <Container className="mx-auto my-4">
        <div className="col-md-12">
          <Card body color="success">
            <CardTitle className="text-center text-white">
              <h2>New Client</h2>
            </CardTitle>
            <Form onSubmit={this.onSubmit}>
              <Card body className="mb-3">
                <CardSubtitle className="text-center">
                  <h4>Basic Information</h4>
                </CardSubtitle>

                <div className="mb-3">
                  <Label for="name">Name *</Label>
                  <Input
                    type="text"
                    className="form-control form-control-lg"
                    id="name"
                    name="name"
                    onChange={this.onChange}
                  />
                </div>
                <Row>
                  <div className="col-md-6 mb-3">
                    <Label for="organizationName">Organization Name</Label>
                    <Input
                      type="text"
                      className="form-control form-control-lg"
                      id="organizationName"
                      name="organizationName"
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <Label for="email">Email</Label>
                    <Input
                      type="text"
                      className="form-control form-control-lg"
                      id="email"
                      name="email"
                      onChange={this.onChange}
                    />
                  </div>
                </Row>
                <Row>
                  <div className="col-md-6 mb-3">
                    <Label for="website">Website</Label>
                    <Input
                      type="text"
                      className="form-control form-control-lg"
                      id="website"
                      name="website"
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <Label for="phone">Phone Number</Label>
                    <Input
                      type="text"
                      className="form-control form-control-lg"
                      id="phone"
                      name="phone"
                      onChange={this.onChange}
                    />
                  </div>
                </Row>
              </Card>

              <Card body className="mb-3">
                <CardSubtitle className="text-center">
                  <h4>Location</h4>
                </CardSubtitle>
                <Row>
                  <div className="col-md-12 mb-3">
                    <Label for="address">Street Address</Label>
                    <Input
                      type="text"
                      className="form-control form-control-lg"
                      id="address"
                      name="address"
                      onChange={this.onChange}
                    />
                  </div>
                </Row>
                <Row>
                  <div className="col-md-4 mb-3">
                    <Label for="city">City</Label>
                    <Input
                      type="text"
                      className="form-control form-control-lg"
                      id="city"
                      name="city"
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <Label for="state">State</Label>
                    <Input
                      type="text"
                      className="form-control form-control-lg"
                      id="state"
                      name="state"
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <Label for="zipCode">Zip Code</Label>
                    <Input
                      type="text"
                      className="form-control form-control-lg"
                      id="zipCode"
                      name="zipCode"
                      onChange={this.onChange}
                    />
                  </div>
                </Row>
              </Card>
              <Card body className="mb-3">
                <CardSubtitle className="text-center">
                  <h4>Notes</h4>
                </CardSubtitle>
                <Input
                  type="textarea"
                  className="form-control form-control-lg"
                  id="notes"
                  name="notes"
                  onChange={this.onChange}
                />
              </Card>
              <div className="col-md-6 offset-3">
                <Input type="submit" value="Submit" className=" btn btn-info" />
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

    const clientData = {
      name: this.state.name,
      organizationName: this.state.organizationName,
      email: this.state.email,
      website: this.state.website,
      phone: this.state.phone,
      location: {
        address: this.state.address,
        city: this.state.city,
        state: this.state.state,
        zipCode: this.state.zipCode
      },

      notes: this.state.notes
    };

    this.props.createClient(clientData, this.props.history);
  };
}

CreateClient.propTypes = {
  client: PropTypes.object,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  client: state.client,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createClient }
)(CreateClient);
