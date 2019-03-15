import React, { Component } from "react";
import {
  Container,
  Button,
  Card,
  CardBody,
  CardTitle,
  Table,
  Row
} from "reactstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { getRecentInvoices, getInvoice } from "../../actions/invoiceActions";
import { getRecentBills, getBill } from "../../actions/billActions";
import { getProfile } from "../../actions/profileActions";
import { RecentInvoiceItem } from "./dashboard/RecentInvoiceItem";
import { RecentBillItem } from "./dashboard/RecentBillItem";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      days: 30
    };
  }
  componentWillMount() {
    // Loads invoices from DB into redux state
    this.props.getRecentInvoices(this.state.days);
    this.props.getRecentBills(this.state.days);
    this.props.getProfile();
  }

  render() {
    const { invoices, loading } = this.props.invoice;
    const { bills } = this.props.bill;
    const { profile } = this.props;
    const billLoading = this.props.bill.loading;
    let recentInvoiceItems;
    let recentBillItems;
    let profileButton;
    let isLoading;
    // Create Invoice Items
    if (invoices === null || loading) {
      isLoading = (
        <div>
          <h4>Loading...</h4>
        </div>
      );
    } else if (invoices.length > 0) {
      // Check which invoices will be displayed on current page
      isLoading = null;

      // Map invoices from array to individual components
      recentInvoiceItems = invoices.map((invoice, index) => (
        <RecentInvoiceItem
          onClick={this.onEditClick.bind(null, "invoice", invoice._id)}
          invoice={invoice}
          key={invoice._id}
          index={index}
        />
      ));
    } else if (invoices.length < 1) {
      recentInvoiceItems = (
        <tr>
          <th colSpan={10}>
            <h4>No invoices found</h4>
          </th>
        </tr>
      );
    }

    // Create Bill Items
    if (bills === null || billLoading) {
      isLoading = (
        <div>
          <h4>Loading...</h4>
        </div>
      );
    } else if (bills.length > 0) {
      // Check which bills will be displayed on current page
      isLoading = null;

      // Map bills from array to individual components
      recentBillItems = bills.map((bill, index) => (
        <RecentBillItem
          onClick={this.onEditClick.bind(null, "bill", bill._id)}
          key={bill._id}
          bill={bill}
          index={index}
        />
      ));
    } else if (bills.length < 1) {
      recentBillItems = (
        <tr>
          <th colSpan={10}>
            <h4>No bills found</h4>
          </th>
        </tr>
      );
    }

    // Check for existing profile
    if (profile.profile === null && profile.loading) {
      isLoading = (
        <div>
          <h4>Loading...</h4>
        </div>
      );
    } else if (profile.profile) {
      profileButton = null;
    } else if (profile.profile === null) {
      profileButton = (
        <div className="text-center mb-2">
          <Link to={"/profile"}>
            <Button color="primary">Create Profile</Button>
          </Link>
        </div>
      );
    }
    return (
      <div id="dashboard" className="mainBg">
        <Container fluid className="p-5">
          {isLoading}
          {profileButton}
          <Row className="mb-5">
            <div className="col-md-6">
              <Card>
                <CardBody>
                  <CardTitle>
                    <Row className="mx-4">
                      <div className="col-6">
                        <h4>Recent Invoices</h4>
                      </div>
                      <div className="col-6">
                        <Link to={"/invoices/create"}>
                          <Button color="info" className="float-right">
                            Create New Invoice
                          </Button>
                        </Link>
                      </div>
                    </Row>
                  </CardTitle>
                  <Table size="sm">
                    <thead>
                      <tr>
                        <th className="text-center">Edit</th>
                        <th>#</th>
                        <th>Client</th>
                        <th>Due</th>
                        <th>Amount</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>{recentInvoiceItems}</tbody>
                  </Table>
                </CardBody>
              </Card>
            </div>
            <div className="col-md-6">
              <Card>
                <CardBody>
                  <CardTitle>
                    <Row className="mx-4">
                      <div className="col-6">
                        <h4>Bill Activity</h4>
                      </div>
                      <div className="col-6">
                        <Link to={"/bills/create"}>
                          <Button color="info" className="float-right">
                            Create New Bill
                          </Button>
                        </Link>
                      </div>
                    </Row>
                  </CardTitle>
                  <Table size="sm">
                    <thead>
                      <tr>
                        <th className="text-center">Edit</th>
                        <th>#</th>
                        <th>From</th>
                        <th>Due</th>
                        <th>Amount</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>{recentBillItems}</tbody>
                  </Table>
                </CardBody>
              </Card>
            </div>
          </Row>
        </Container>
      </div>
    );
  }
  onEditClick = (type, id) => {
    // // Puts individual info into redux state and pushes to /invoices/edit
    if (type === "invoice") {
      this.props.getInvoice(id, this.props.history);
    }
    if (type === "bill") {
      this.props.getBill(id, this.props.history);
    }
  };
}

Dashboard.propTypes = {
  getRecentInvoices: PropTypes.func.isRequired,
  getRecentBills: PropTypes.func.isRequired,
  getProfile: PropTypes.func
};

const mapStateToProps = state => ({
  invoice: state.invoice,
  bill: state.bill,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getRecentInvoices, getRecentBills, getInvoice, getBill, getProfile }
)(Dashboard);
