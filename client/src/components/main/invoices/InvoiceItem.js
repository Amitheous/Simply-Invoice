import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { getInvoice, deleteInvoice } from "../../../actions/invoiceActions";
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

class InvoiceItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
  }

  render() {
    const { invoice } = this.props;
    return (
      <ListGroupItem>
        {/* Modals for each element to confirm client delete */}
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Confirm Delete</ModalHeader>
          <ModalBody>
            Are you sure you want to delete {invoice.title}? This action cannot
            be undone.
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              onClick={this.onDeleteClick.bind(this, invoice._id)}
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
            <h3>{invoice.title}</h3>
            <h6>Status: {invoice.status}</h6>
          </div>
          <div className="col-md-4">
            <h6>To: {invoice.from.organizationName}</h6>
            <h6>Due: {moment(invoice.dueDate).format("MMM Do, YYYY")}</h6>
          </div>
          <div className="col-md-1 my-auto">
            <Button
              className="btn-light"
              aria-label="Edit Invoice"
              title="Edit Invoice"
              onClick={this.onEditClick.bind(this, invoice._id)}
            >
              <FontAwesomeIcon icon="edit" color="green" size="2x" />
            </Button>
          </div>
          <div className="col-md-1 my-auto">
            <Button
              className="btn-warning"
              aria-label="Create PDF"
              title="Create PDF"
              onClick={this.onPdfClick.bind(this, invoice._id)}
            >
              <FontAwesomeIcon icon="file-pdf" color="white" size="2x" />
            </Button>
          </div>
          <div className="col-md-1 my-auto">
            <Button
              close
              aria-label="Delete Invoice"
              title="Delete Invoice"
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
    this.props.deleteInvoice(id);
  };

  onEditClick = id => {
    // Puts individual info into redux state and pushes to /invoices/edit
    this.props.getInvoice(id, this.props.history);
  };
  onPdfClick = id => {
    // Puts individual info into redux state and pushes to /generate-pdf
    this.props.getInvoice(id, this.props.history, "/generate-pdf");
  };
}

InvoiceItem.propTypes = {
  invoice: PropTypes.object,
  getInvoice: PropTypes.func.isRequired,
  deleteInvoice: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  invoices: state.invoices
});

// Need withRouter here or history.push doesn't know what to do.
export default withRouter(
  connect(
    mapStateToProps,
    { getInvoice, deleteInvoice }
  )(InvoiceItem)
);
