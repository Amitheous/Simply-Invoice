import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Link } from "react-router-dom";
import ClientItem from "./clients/ClientItem";
import {
  Container,
  ListGroup,
  Button,
  Pagination,
  PaginationItem,
  PaginationLink
} from "reactstrap";

import { getClients } from "../../actions/clientActions";

class Clients extends Component {
  //                    TO ADD:FUNCTIONALITY FOR PAGINATION
  constructor() {
    super();
    this.state = {
      currentPage: 1,
      clientsPerPage: 6
    };
  }

  componentDidMount() {
    // Loads clients from DB into redux state
    this.props.getClients();
  }

  render() {
    let renderPageNumbers;
    let clientItems;
    const { clients, loading } = this.props.client;
    if (clients === null || loading) {
      clientItems = (
        <div>
          <h4>Loading...</h4>
        </div>
      );
    } else if (clients.length > 0) {
      // Map client from array to individual elements

      const { currentPage, clientsPerPage } = this.state;
      const indexOfLastClient = currentPage * clientsPerPage;
      const indexOfFirstClient = indexOfLastClient - clientsPerPage;
      const currentClients = clients.slice(
        indexOfFirstClient,
        indexOfLastClient
      );
      clientItems = currentClients.map((client, index) => (
        <ClientItem key={client._id} client={client} index={index} />
      ));
      const pageNumbers = [];
      for (let i = 1; i <= Math.ceil(clients.length / clientsPerPage); i++) {
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
    } else if (clients.length < 1) {
      clientItems = (
        <div>
          <h4>No clients found</h4>
        </div>
      );
    }

    return (
      <Container className="my-4 pb-5">
        <div className="text-center">
          <Link to={"/clients/create"}>
            <Button color="info">Add New Client</Button>
          </Link>
        </div>
        <ListGroup className="py-3">{clientItems}</ListGroup>
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

Clients.propTypes = {
  getClients: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  client: state.client
});

export default connect(
  mapStateToProps,
  { getClients }
)(Clients);
