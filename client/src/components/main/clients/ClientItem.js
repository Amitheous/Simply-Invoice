import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { getClient, deleteClient } from "../../../actions/clientActions";
import { connect } from "react-redux";

import {
  ListGroupItem,
  Row,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class ClientItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
  }

  render() {
    const { client } = this.props;
    return (
      <ListGroupItem>
        <Row>
          <div className="col-md-5">
            <h3>{client.name}</h3>
            <h5>{client.phone}</h5>
          </div>
          <div className="col-md-4">
            <h6>{client.organizationName}</h6>
            <h6>{client.email}</h6>
          </div>
          <div className="col-md-2 my-auto">
            <Button
              className="btn-light"
              aria-label="Edit Client"
              title="Edit Client"
              onClick={this.onEditClick.bind(this, client._id)}
            >
              <FontAwesomeIcon icon="edit" size="2x" color="green" />
            </Button>
          </div>
          <div className="col-md-1 my-auto">
            <Button
              close
              aria-label="Delete Client"
              title="Delete Client"
              size="sm"
              className="float-right"
              onClick={this.toggle}
            >
              <FontAwesomeIcon icon="trash-alt" color="red" />
            </Button>
          </div>
        </Row>

        {/* Modals for each element to confirm client delete */}
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Confirm Delete</ModalHeader>
          <ModalBody>
            Are you sure you want to delete {client.name}? This action is
            permanent
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              onClick={this.onDeleteClick.bind(this, client._id)}
            >
              Confirm
            </Button>
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </ListGroupItem>
    );
  }

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  };

  onDeleteClick = id => {
    this.props.deleteClient(id);
  };

  onEditClick = id => {
    // Puts individual client info into redux state and pushes to /clients/edit
    this.props.getClient(id, this.props.history);
  };
}

ClientItem.propTypes = {
  client: PropTypes.object,
  getClient: PropTypes.func.isRequired,
  deleteClient: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  clients: state.clients
});

// Need withRouter here or history.push doesn't know what to do.
export default withRouter(
  connect(
    mapStateToProps,
    { getClient, deleteClient }
  )(ClientItem)
);
