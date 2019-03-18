import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";

import { getClients } from "../../../actions/clientActions";
import { editInvoice, clearInvoice } from "../../../actions/formActions";
import { SelectClient } from "../formSections/SelectClient";

import {
  Container,
  Card,
  CardTitle,
  Row,
  Label,
  Input,
  Button,
  ListGroupItem,
  DropdownItem,
  Form,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert
} from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Items } from "../formSections/Items";
import { BottomArea } from "../formSections/BottomArea";
import { TopArea } from "../formSections/TopArea";
import { ItemModal } from "../formSections/ItemModal";

class EditInvoice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFluid: false,
      formId: "",
      clients: [],
      title: "",
      subtotal: 0,
      total: 0,
      tax: 0,
      description: "",
      formNumber: "",
      status: "",
      referenceNumber: "",
      date: moment().format("YYYY-MM-DD"),
      dueDate: moment().format("YYYY-MM-DD"),
      editModal: false,
      editModalArea: null,
      from: {
        organizationName: "",
        location: {
          address: "",
          city: "",
          state: "",
          zipCode: ""
        },
        email: "",
        phone: ""
      },
      to: {
        organizationName: "",
        location: {
          address: "",
          city: "",
          state: "",
          zipCode: ""
        },
        email: "email@test.com",
        phone: "123-456-7890"
      },
      items: [],
      itemDescription: "",
      itemRate: null,
      itemQuantity: null,
      itemAmount: null,
      notes: "",
      paid: false,
      errors: {},
      modal: false
    };
  }

  componentWillMount() {
    this.props.getClients();
  }

  componentWillReceiveProps(nextProps) {
    const { invoice } = nextProps.form;
    if (invoice) {
      this.setState({
        title: invoice.title,
        formId: invoice._id,
        date: moment(invoice.date).format("YYYY-MM-DD"),
        dueDate: moment(invoice.dueDate).format("YYYY-MM-DD"),
        description: invoice.description,
        formNumber: invoice.formNumber,
        from: {
          organizationName: invoice.from.organizationName,
          location: {
            address: invoice.from.location.address,
            city: invoice.from.location.city,
            state: invoice.from.location.state,
            zipCode: invoice.from.location.zipCode
          }
        },
        items: invoice.items,
        referenceNumber: invoice.referenceNumber,
        status: invoice.status,
        subtotal: invoice.subtotal,
        tax: invoice.tax,
        to: invoice.to,
        total: invoice.total
      });
    }
    if (nextProps.client.clients) {
      this.setState({
        clients: nextProps.client.clients
      });
    }
  }

  componentWillUnmount() {
    this.props.clearInvoice();
  }

  render() {
    const { items, from, to, total, subtotal, clients } = this.state;
    const organizationName = this.state.from.organizationName;
    let editModalItems, formItems;
    let displayTax = this.state.tax * 100;

    const prettyNumber = num => {
      if (typeof num === "number") {
        return num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      } else {
        return num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
    };

    if (this.state.editModalArea === "from") {
      editModalItems = (
        <Modal
          isOpen={this.state.editModal}
          toggle={this.editModalArea}
          className={this.props.className}
        >
          <ModalHeader toggle={this.editModalArea}>From</ModalHeader>
          <Form>
            <ModalBody>
              <Label for="organizationName">Organization Name</Label>
              <Input
                value={this.state.from.organizationName}
                name="organizationName"
                onChange={this.onEdit}
              />
              <Label for="address">Address</Label>
              <Input
                value={this.state.from.location.address}
                name="address"
                onChange={this.onEdit}
              />
              <Label for="city">City</Label>
              <Input
                value={this.state.from.location.city}
                name="city"
                onChange={this.onEdit}
              />
              <Label for="state">State</Label>
              <Input
                value={this.state.from.location.state}
                name="state"
                onChange={this.onEdit}
              />
              <Label for="zipCode">Zip Code</Label>
              <Input
                value={this.state.from.location.zipCode}
                name="zipCode"
                onChange={this.onEdit}
              />
            </ModalBody>
            {!this.state.errors.emptyFields ? null : (
              <Alert color="danger" className="text-center">
                {" "}
                {this.state.errors.emptyFields}{" "}
              </Alert>
            )}
            <ModalFooter>
              <Button color="primary" onClick={this.editModal.bind(this, null)}>
                Confirm
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
      );
    } else if (this.state.editModalArea === "to") {
      editModalItems = (
        <Modal
          isOpen={this.state.editModal}
          toggle={this.editModalArea}
          className={this.props.className}
        >
          <ModalHeader toggle={this.editModalArea}>Bill To</ModalHeader>
          <Form>
            <ModalBody>
              <Label for="organizationName">Organization Name</Label>
              <Input
                value={this.state.to.organizationName}
                name="organizationName"
                onChange={this.onEdit}
              />
              <Label for="address">Address</Label>
              <Input
                value={this.state.to.location.address}
                name="address"
                onChange={this.onEdit}
              />
              <Label for="city">City</Label>
              <Input
                value={this.state.to.location.city}
                name="city"
                onChange={this.onEdit}
              />
              <Label for="state">State</Label>
              <Input
                value={this.state.to.location.state}
                name="state"
                onChange={this.onEdit}
              />
              <Label for="zipCode">Zip Code</Label>
              <Input
                value={this.state.to.location.zipCode}
                name="zipCode"
                onChange={this.onEdit}
              />
            </ModalBody>
            {!this.state.errors.emptyFields ? null : (
              <Alert color="danger" className="text-center">
                {" "}
                {this.state.errors.emptyFields}{" "}
              </Alert>
            )}
            <ModalFooter>
              <Button color="primary" onClick={this.editModal.bind(this, null)}>
                Confirm
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
      );
    }
    if (items) {
      formItems = items.map((item, index) => (
        <ListGroupItem key={index}>
          <Row>
            <div className="col-md-1 border-right text-center border-dark">
              <Button onClick={this.removeItem.bind(this, index)}>
                <FontAwesomeIcon icon="trash-alt" className="text-danger" />
              </Button>
            </div>
            <div className="col-md-5 border-right border-dark">
              <h5>{item.description}</h5>
            </div>
            <div className="col-md-2 text-center border-right border-dark">
              <h5>{item.quantity}</h5>
            </div>
            <div className="col-md-2 text-center border-right border-dark">
              <h5>${prettyNumber(item.rate.toFixed(2))}</h5>
            </div>
            <div className="col-md-2 text-center">
              <h5>${prettyNumber(item.amount.toFixed(2))}</h5>
            </div>
          </Row>
        </ListGroupItem>
      ));
    }

    let clientMenu = clients.map((client, index) => (
      <DropdownItem onClick={this.fillClient.bind(null, client)} key={index}>
        {client.organizationName}
      </DropdownItem>
    ));

    return (
      <Container fluid={this.state.isFluid} className="mx-auto my-4">
        <div className="col-lg-12">
          <Card body color="success">
            <CardTitle className="text-center text-white">
              <h2>Edit Invoice</h2>
            </CardTitle>
            <Form noValidate onSubmit={this.onSubmit}>
              <Card body className="mb-3">
                <TopArea
                  title={this.state.title}
                  formNumber={this.state.formNumber}
                  description={this.state.description}
                  date={this.state.date}
                  dueDate={this.state.dueDate}
                  onChange={this.onChange}
                  formType={"Invoice"}
                />
                <Row>
                  <div
                    className={
                      this.state.isSmall ? "col-6" : "col-md-5 offset-1 mb-5"
                    }
                  >
                    <h5>From</h5>
                    <Button
                      onClick={this.editModal.bind(this, "from")}
                      color="warning"
                      className="mb-2"
                    >
                      Edit
                    </Button>
                    <div className="ml-4">
                      <h6>{organizationName}</h6>
                      <h6>{from.location.address}</h6>
                      <h6>
                        {from.location.city} {from.location.state}{" "}
                        {from.location.zipCode}
                      </h6>
                    </div>
                  </div>
                  <div
                    className={
                      this.state.isSmall ? "col-6" : "col-md-5 offset-1 mb-3"
                    }
                  >
                    <h5>To</h5>
                    <Row className="mb-2">
                      <Button
                        onClick={this.editModal.bind(this, "to")}
                        color="warning"
                        className="mx-3"
                      >
                        Edit
                      </Button>
                      <SelectClient
                        dropdownOpen={this.state.dropdownOpen}
                        clientMenu={clientMenu}
                        toggleDropdown={this.toggleDropdown}
                      />
                    </Row>
                    <div className="ml-4">
                      <h6>{to.organizationName}</h6>
                      <h6>{to.location.address}</h6>
                      <h6>
                        {to.location.city} {to.location.state}{" "}
                        {to.location.zipCode}
                      </h6>
                    </div>
                  </div>
                </Row>
                <Items formItems={formItems} toggle={this.toggle} />
                <BottomArea
                  isSmall={this.state.isSmall}
                  paid={this.state.paid}
                  prettyNumber={prettyNumber}
                  subtotal={subtotal}
                  total={total}
                  displayTax={displayTax}
                  onTaxChange={this.onTaxChange}
                  handleCheck={this.handleCheck}
                />
              </Card>
              <div
                className={this.state.isSmall ? "col-12" : "col-md-6 offset-3"}
              >
                <Input type="submit" value="Submit" className=" btn btn-info" />
              </div>
            </Form>
          </Card>
        </div>

        {editModalItems}

        <ItemModal
          modal={this.state.modal}
          className={this.props.className}
          toggle={this.toggle}
          onChange={this.onChange}
          errors={this.state.errors}
          addItem={this.addItem}
        />
      </Container>
    );
  }
  handleCheck = e => {
    this.setState({ paid: !this.state.paid });
  };

  // For keeping info in fields and component state equal
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onEdit = e => {
    if (this.state.editModalArea === "from") {
      this.setState({
        from: {
          organizationName:
            e.target.name === "organizationName"
              ? e.target.value
              : this.state.from.organizationName,
          location: {
            address:
              e.target.name === "address"
                ? e.target.value
                : this.state.from.location.address,
            city:
              e.target.name === "city"
                ? e.target.value
                : this.state.from.location.city,
            state:
              e.target.name === "state"
                ? e.target.value
                : this.state.from.location.state,
            zipCode:
              e.target.name === "zipCode"
                ? e.target.value
                : this.state.from.location.zipCode
          }
        }
      });
    } else if (this.state.editModalArea === "to") {
      this.setState({
        to: {
          organizationName:
            e.target.name === "organizationName"
              ? e.target.value
              : this.state.to.organizationName,
          location: {
            address:
              e.target.name === "address"
                ? e.target.value
                : this.state.to.location.address,
            city:
              e.target.name === "city"
                ? e.target.value
                : this.state.to.location.city,
            state:
              e.target.name === "state"
                ? e.target.value
                : this.state.to.location.state,
            zipCode:
              e.target.name === "zipCode"
                ? e.target.value
                : this.state.to.location.zipCode
          }
        }
      });
    }
  };

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  };

  editModal(area) {
    // Toggle modal to edit To or From
    this.setState(prevState => ({
      editModal: !prevState.editModal,
      editModalArea: area
    }));
  }

  // Toggle Dropdown for clients
  toggleDropdown = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  };

  // Filling in the fields for a client
  fillClient = client => {
    this.setState({
      to: {
        organizationName: client.organizationName,
        email: client.email ? client.email : "",
        phone: client.phone ? client.phone : "",
        location: {
          address: client.location.address ? client.location.address : "",
          city: client.location.city ? client.location.city : "",
          state: client.location.state ? client.location.state : "",
          zipCode: client.location.zipCode ? client.location.zipCode : ""
        }
      }
    });
  };

  // Recalculate totals on delete
  removeItem(index) {
    function roundToTwo(num) {
      return +(Math.round(num + "e+2") + "e-2");
    }
    let newItems = this.state.items;
    newItems.splice(index, 1);
    let newSubtotal = 0;
    this.state.items.forEach(item => (newSubtotal += item.amount));
    newSubtotal = parseFloat(roundToTwo(newSubtotal));
    let newTotal = parseFloat(
      roundToTwo(newSubtotal + newSubtotal * this.state.tax)
    );
    this.setState({
      items: newItems,
      subtotal: newSubtotal,
      total: newTotal
    });
  }

  addItem = () => {
    if (
      this.state.itemDescription === "" ||
      this.state.itemRate === null ||
      this.state.itemRate === "" ||
      this.state.itemRate === 0 ||
      this.state.itemQuantity === null ||
      this.state.itemQuantity === "" ||
      this.state.itemQuantity === 0
    ) {
      this.setState({
        errors: {
          emptyFields: "Please fill out all fields"
        }
      });

      // Clear error message after 3 seconds
      setTimeout(() => {
        this.setState({ errors: {} });
      }, 3000);
    } else {
      // Make sure errors are empty
      this.setState({
        errors: {}
      });

      // Similar to num.toFixed(2) in function, but avoids floating point errors for rounding numbers like 1.005
      function roundToTwo(num) {
        return +(Math.round(num + "e+2") + "e-2");
      }

      const rate = parseFloat(roundToTwo(this.state.itemRate));

      const amount = parseFloat(roundToTwo(rate * this.state.itemQuantity));
      // Create item to add to invoice object
      const newItem = {
        description: this.state.itemDescription,
        quantity: this.state.itemQuantity,
        rate: rate,
        amount: amount
      };

      // Add item to items array
      this.state.items.unshift(newItem);
      // Update invoice total
      let newSubtotal = 0;
      let newTotal = 0;
      this.state.items.forEach(item => (newSubtotal += item.amount));

      newSubtotal = parseFloat(roundToTwo(newSubtotal));
      newTotal = parseFloat(
        roundToTwo(newSubtotal + newSubtotal * this.state.tax)
      );
      // Reset item in state for better UX when adding multiple items, and update total
      this.setState({
        itemDescription: "",
        itemQuantity: 1,
        itemRate: null,
        subtotal: newSubtotal,
        total: newTotal
      });
      this.toggle();
    }
  };
  // To make the total update on tax input
  onTaxChange = e => {
    this.setState({
      tax: e.target.value / 100,
      total: this.state.subtotal + (this.state.subtotal * e.target.value) / 100
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const newInvoiceData = {
      title: this.state.title,
      formType: "invoice",
      description: this.state.description,
      formNumber: this.state.formNumber,
      status: this.state.paid ? "paid" : "unpaid",
      referenceNumber: this.state.referenceNumber,
      date: this.state.date,
      dueDate: this.state.dueDate,
      from: this.state.from,
      to: this.state.to,
      items: this.state.items,
      tax: Number(this.state.tax.toFixed(4)),
      subtotal: this.state.subtotal,
      total: this.state.total
    };

    this.props.editInvoice(
      this.state.formId,
      newInvoiceData,
      this.props.history
    );
  };
}

EditInvoice.propTypes = {
  invoice: PropTypes.object,
  errors: PropTypes.object,
  editInvoice: PropTypes.func,
  clearInvoice: PropTypes.func
};

const mapStateToProps = state => ({
  form: state.form,
  client: state.client,
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { editInvoice, getClients, clearInvoice }
)(EditInvoice);
