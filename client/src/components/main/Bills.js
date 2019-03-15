import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Link } from "react-router-dom";
import BillItem from "./bills/BillItem";
import {
  Container,
  ListGroup,
  Button,
  Pagination,
  PaginationItem,
  PaginationLink
} from "reactstrap";

import { getBills } from "../../actions/billActions";

class Bills extends Component {
  constructor() {
    super();
    this.state = {
      currentPage: 1,
      billsPerPage: 6
    };
  }

  componentWillMount() {
    // Loads bills from DB into redux state
    this.props.getBills();
  }

  render() {
    const { bills, loading } = this.props.bill;
    let renderPageNumbers;
    let billItems;
    let isLoading;
    if (bills === null || loading) {
      isLoading = (
        <div>
          <h4>Loading...</h4>
        </div>
      );
    } else if (bills.length > 0) {
      // Check which bills will be displayed on current page
      isLoading = null;

      const { currentPage, billsPerPage } = this.state;
      const indexOfLastBill = currentPage * billsPerPage;
      const indexOfFirstBill = indexOfLastBill - billsPerPage;
      const currentBills = bills.slice(indexOfFirstBill, indexOfLastBill);

      // Map bills from array to individual components
      billItems = currentBills.map((bill, index) => (
        <BillItem key={bill._id} bill={bill} index={index} />
      ));
      const pageNumbers = [];
      for (let i = 1; i <= Math.ceil(bills.length / billsPerPage); i++) {
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
    } else if (bills.length < 1) {
      billItems = (
        <div>
          <h4>No bills found</h4>
        </div>
      );
    }

    return (
      <Container className="my-4 pb-5">
        <div className="text-center">
          <Link to={"/bills/create"}>
            <Button color="info">Create New Bill</Button>
          </Link>
        </div>
        {isLoading}
        <ListGroup className="py-3">{billItems}</ListGroup>
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

Bills.propTypes = {
  getBills: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  bill: state.bill
});

export default connect(
  mapStateToProps,
  { getBills }
)(Bills);
