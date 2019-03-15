import React, { Component } from "react";
import { connect } from "react-redux";
import { createBill } from "../../../actions/billActions";
import { getProfile } from "../../../actions/profileActions";
import PropTypes from "prop-types";

import moment from "moment";
import {
  Container,
  Alert,
  Button,
  Card,
  CardTitle,
  Form,
  Input,
  Label,
  ListGroupItem,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row
} from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Items } from "../formSections/Items";
import { BottomArea } from "../formSections/BottomArea";
import { TopArea } from "../formSections/TopArea";
import { ItemModal } from "../formSections/ItemModal";

class CreateBill extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFluid: false,
      title: "",
      subtotal: 0,
      total: 0,
      tax: 0,
      description: "",
      formNumber: "",
      status: "",
      referenceNumber: "",
      date: "",
      dueDate: "",
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
    this.props.getProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;
      this.setState({
        tax: profile.defaultTax,
        to: {
          name: profile.name ? profile.name : "",
          organizationName: profile.organizationName
            ? profile.organizationName
            : "",
          email: profile.email ? profile.email : "",
          phone: profile.phone ? profile.phone : "",
          location: {
            address: profile.location.address ? profile.location.address : "",
            city: profile.location.city ? profile.location.city : "",
            state: profile.location.state ? profile.location.state : "",
            zipCode: profile.location.zipCode ? profile.location.zipCode : ""
          }
        }
      });
    }

    this.setState({
      date: moment().format("YYYY-MM-DD"),
      dueDate: moment().format("YYYY-MM-DD")
    });
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  render() {
    let displayTax = this.state.tax * 100;
    const prettyNumber = num => {
      if (typeof num === "number") {
        return num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      } else {
        return num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
    };

    let editModalItems;
    editModalItems = this.toOrFrom(editModalItems);

    const { items, from, to, total, subtotal } = this.state;
    let formItems;
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

    return (
      <Container fluid={this.state.isFluid} className="mx-auto my-4">
        <div className="col-lg-12">
          <Card body color="success">
            <CardTitle className="text-center text-white">
              <h2>New Bill</h2>
            </CardTitle>
            <Form noValidate onSubmit={this.onSubmit}>
              <Card body className="mb-3">
                <TopArea
                  date={this.state.date}
                  dueDate={this.state.dueDate}
                  onChange={this.onChange}
                  formType={"Bill"}
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
                      <h6>{from.organizationName}</h6>
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
                    <Button
                      onClick={this.editModal.bind(this, "to")}
                      color="warning"
                      className="mb-2"
                    >
                      Edit
                    </Button>
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

  editModal(area) {
    // Toggle modal to edit To or From
    this.setState(prevState => ({
      editModal: !prevState.editModal,
      editModalArea: area
    }));
  }

  // To make the total update on tax input
  onTaxChange = e => {
    this.setState({
      tax: e.target.value / 100,
      total: this.state.subtotal + (this.state.subtotal * e.target.value) / 100
    });
  };

  // Submit the bill to DB
  onSubmit = e => {
    e.preventDefault();

    const billData = {
      title: this.state.title,
      formType: "bill",
      description: this.state.description,
      formNumber: this.state.formNumber,
      status: this.state.paid ? "paid" : "unpaid",
      referenceNumber: this.state.referenceNumber,
      date: this.state.date,
      dueDate: this.state.dueDate,
      from: this.state.from,
      to: this.state.to,
      items: this.state.items,
      tax: this.state.tax,
      subtotal: this.state.subtotal,
      total: this.state.total
    };

    this.props.createBill(billData, this.props.history);
  };
  // Making container fluid improves UX on midsize screens
  updateDimensions = () => {
    if (window.innerWidth < 992) {
      this.setState({ isFluid: true });
    } else {
      this.setState({ isFluid: false });
    }

    if (window.innerWidth < 768) {
      this.setState({ isSmall: true });
    } else {
      this.setState({ isSmall: false });
    }
  };

  // Toggle modal for items
  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  };

  // Adding items to the bill
  addItem = () => {
    if (
      this.state.itemDescription === "" ||
      this.state.itemRate === null ||
      this.state.itemQuantity === null
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
      // Create item to add to bill object
      const newItem = {
        description: this.state.itemDescription,
        quantity: this.state.itemQuantity,
        rate: rate,
        amount: amount
      };

      // Add item to items array
      this.state.items.unshift(newItem);
      // Update bill total
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
  toOrFrom(editModalItems) {
    if (this.state.editModalArea === "from") {
      editModalItems = (
        <Modal
          isOpen={this.state.editModal}
          toggle={this.editModalArea}
          className={this.props.className}
        >
          <ModalHeader toggle={this.editModalArea}>From</ModalHeader>
          <Form onSubmit={this.submitEdit}>
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
    return editModalItems;
  }
}

CreateBill.propTypes = {
  bill: PropTypes.object,
  profile: PropTypes.object,
  errors: PropTypes.object,
  getProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  bill: state.bill,
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createBill, getProfile }
)(CreateBill);
