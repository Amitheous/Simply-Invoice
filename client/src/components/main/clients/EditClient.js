import React, { Component } from "react";
import { connect } from "react-redux";
import { updateClient, getClient } from "../../../actions/clientActions";
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
import isEmpty from "../../../validation/is-empty";

class EditClient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      organizationName: "",
      email: "",
      website: "",
      phone: "",
      location: {
        address: "",
        city: "",
        state: "",
        zipCode: ""
      },
      notes: "",
      errors: {}
    };
  }

  componentWillMount() {
    // Check if component is in redux state
    // If no client id is present push back to /clients
    if (this.props.client.client !== null) {
      this.props.getClient(this.props.client.client._id);
    } else {
      this.props.history.push("/clients");
    }
  }
  componentWillReceiveProps = nextProps => {
    // Client should be in redux state at this point
    // Take client from redux state and put into component state
    if (nextProps.client.client) {
      const client = nextProps.client.client;
      console.log(nextProps);

      // Check for fields with data, empty ones receive empty string
      client.name = !isEmpty(client.name) ? client.name : "";
      client.organizationName = !isEmpty(client.organizationName)
        ? client.organizationName
        : "";
      client.email = !isEmpty(client.email) ? client.email : "";
      client.website = !isEmpty(client.website) ? client.website : "";
      client.phone = !isEmpty(client.phone) ? client.phone : "";

      // Set component fields in state
      this.setState({
        name: client.name,
        organizationName: client.organizationName,
        email: client.email,
        website: client.website,
        phone: client.phone,
        location: {
          address: client.location.address,
          city: client.location.city,
          state: client.location.state,
          zipCode: client.location.zipCode
        },
        notes: client.notes
      });
    }
  };

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
                    value={this.state.name}
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
                      value={this.state.organizationName}
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
                      value={this.state.email}
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
                      value={this.state.website}
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
                      value={this.state.phone}
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
                      value={this.state.location.address}
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
                      value={this.state.location.city}
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
                      value={this.state.location.state}
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
                      value={this.state.location.zipCode}
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
                  value={this.state.notes}
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
      // Get info from state to pass into the updateClient function
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

    this.props.updateClient(
      this.props.client.client._id,
      clientData,
      this.props.history
    );
  };
}

EditClient.propTypes = {
  client: PropTypes.object,
  updateClient: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  client: state.client,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { updateClient, getClient }
)(EditClient);
