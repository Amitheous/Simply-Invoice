import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { getBill, deleteBill } from "../../../actions/billActions";
import { connect } from "react-redux";
import moment from "moment";

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

class BillItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
  }

  render() {
    const { bill } = this.props;
    return (
      <ListGroupItem>
        {/* Modals for each element to confirm client delete */}
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Confirm Delete</ModalHeader>
          <ModalBody>
            Are you sure you want to delete {bill.title}? This action cannot be
            undone.
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              onClick={this.onDeleteClick.bind(this, bill._id)}
            >
              Confirm
            </Button>
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>

        <Row>
          <div className="col-md-5">
            <h3>{bill.title}</h3>
            <h6>Status: {String(bill.status).toUpperCase()}</h6>
          </div>
          <div className="col-md-4">
            <h6>From: {bill.from.organizationName}</h6>
            <h6>Due: {moment(bill.dueDate).format("MMM Do, YYYY")}</h6>
          </div>
          <div className="col-md-1 my-auto">
            <Button
              className="btn-light"
              aria-label="Edit Bill"
              title="Edit Bill"
              onClick={this.onEditClick.bind(this, bill._id)}
            >
              <FontAwesomeIcon icon="edit" color="green" size="2x" />
            </Button>
          </div>
          <div className="col-md-1 my-auto">
            <Button
              className="btn-warning"
              aria-label="Create PDF"
              title="Create PDF"
              onClick={this.onPdfClick.bind(this, bill._id)}
            >
              <FontAwesomeIcon icon="file-pdf" color="white" size="2x" />
            </Button>
          </div>
          <div className="col-md-1 my-auto">
            <Button
              close
              aria-label="Delete Bill"
              title="Delete Bill"
              className="my-auto"
              onClick={this.toggle}
            >
              <FontAwesomeIcon icon="trash-alt" color="red" />
            </Button>
          </div>
        </Row>
      </ListGroupItem>
    );
  }

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  };

  onDeleteClick = id => {
    this.props.deleteBill(id);
  };

  onEditClick = id => {
    // Puts individual info into redux state and pushes to /invoices/edit
    this.props.getBill(id, this.props.history);
  };

  onPdfClick = id => {
    // Puts individual info into redux state and pushes to /generate-pdf
    this.props.getBill(id, this.props.history, "/generate-pdf");
  };
}

BillItem.propTypes = {
  bill: PropTypes.object,
  getBill: PropTypes.func.isRequired,
  deleteBill: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  bills: state.bills
});

// Need withRouter here or history.push doesn't know what to do.
export default withRouter(
  connect(
    mapStateToProps,
    { getBill, deleteBill }
  )(BillItem)
);
