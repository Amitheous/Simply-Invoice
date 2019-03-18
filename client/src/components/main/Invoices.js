import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Link } from "react-router-dom";
import InvoiceItem from "./invoices/InvoiceItem";
import {
  Container,
  ListGroup,
  Button,
  Pagination,
  PaginationItem,
  PaginationLink
} from "reactstrap";

import { getInvoices } from "../../actions/formActions";

class Invoices extends Component {
  constructor() {
    super();
    this.state = {
      currentPage: 1,
      invoicesPerPage: 6
    };
  }

  componentWillMount() {
    // Loads invoices from DB into redux state
    this.props.getInvoices();
  }

  render() {
    const { invoices, loading } = this.props.form;
    let renderPageNumbers;
    let invoiceItems;
    let isLoading;
    if (invoices === null || loading) {
      isLoading = (
        <div>
          <h4>Loading...</h4>
        </div>
      );
    } else if (invoices.length > 0) {
      // Check which invoices will be displayed on current page
      isLoading = null;

      const { currentPage, invoicesPerPage } = this.state;
      const indexOfLastInvoice = currentPage * invoicesPerPage;
      const indexOfFirstInvoice = indexOfLastInvoice - invoicesPerPage;
      const currentInvoices = invoices.slice(
        indexOfFirstInvoice,
        indexOfLastInvoice
      );

      // Map invoices from array to individual components
      invoiceItems = currentInvoices.map((invoice, index) => (
        <InvoiceItem key={invoice._id} invoice={invoice} index={index} />
      ));
      const pageNumbers = [];
      for (let i = 1; i <= Math.ceil(invoices.length / invoicesPerPage); i++) {
        pageNumbers.push(i);
      }
      renderPageNumbers = pageNumbers.map(number => {
        let pageClass;
        if (number === currentPage) {
          pageClass = "activePage bg-success rounded";
        } else {
          pageClass = "rounded";
        }
        return (
          <PaginationItem key={number} className="mx-1">
            <PaginationLink
              className={pageClass}
              id={number}
              onClick={this.handleClick}
            >
              {number}
            </PaginationLink>
          </PaginationItem>
        );
      });
    } else if (invoices.length < 1) {
      invoiceItems = (
        <div>
          <h4>No invoices found</h4>
        </div>
      );
    }

    return (
      <Container className="my-4 pb-5">
        <div className="text-center">
          <Link to={"/invoices/create"}>
            <Button color="info">Create New Invoice</Button>
          </Link>
        </div>
        {isLoading}
        <ListGroup className="py-3">{invoiceItems}</ListGroup>
        <Pagination size="lg" className="d-flex justify-content-center">
          {renderPageNumbers}
        </Pagination>
      </Container>
    );
  }
  handleClick = e => {
    this.setState({
      currentPage: Number(e.target.id)
    });
  };
}

Invoices.propTypes = {
  getInvoices: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  form: state.form
});

export default connect(
  mapStateToProps,
  { getInvoices }
)(Invoices);
