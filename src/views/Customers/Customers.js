import React, { Component } from "react";
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Table,
  Button
} from "reactstrap";
import ApiClient from "../../ApiClient";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../Components/Loading";

class Customers extends Component {
  constructor(props) {
    super(props);

    this.listCustomers = this.listCustomers.bind(this);

    this.state = {
      customers: [],
      isLoading: true,
      totalItems: 50,
      currentPage: 1
    };
  }

  componentDidMount() {
    this.listCustomers();
  }

  listCustomers() {
    ApiClient.get("@store/customers")
      .then(res => {
        const { success, customers, error } = res;

        if (success) {

          this.setState({
            customers: customers.data,
            currentPage: customers.current_page,
            lastPage: customers.last_page
          });

        } else {

          toast.error("Something went wrong at Quickdine server :(", {
            position: toast.POSITION.TOP_CENTER
          });

        }

        this.setState({ isLoading: false });

      })
      .catch(() => {

        toast.error("Something went wrong at Quickdine server :(", {
          position: toast.POSITION.TOP_CENTER,
        });

        this.setState({ isLoading: false });

      });
  }

  render() {
    const { customers, lastPage, currentPage } = this.state;

    const viewCustomerPage = customerId => "/customers/" + customerId;

    const customersMarkup =
      customers &&
      customers.map((customer, index) => {
        return (
          <tr key={index}>
            <td>
              <Link to={viewCustomerPage(customer.id)}>{customer.name}</Link>
            </td>
            <td>{customer.email}</td>
            <td>{customer.phone}</td>
          </tr>
        );
      });

    var paginationMarkup = [
      currentPage > 1 && (
        <PaginationItem active={false}>
          <PaginationLink tag="button">{currentPage - 1}</PaginationLink>
        </PaginationItem>
      ),
      <PaginationItem active={true}>
        <PaginationLink tag="button">{currentPage}</PaginationLink>
      </PaginationItem>,
      currentPage < lastPage && (
        <PaginationItem active={false}>
          <PaginationLink tag="button">{currentPage + 1}</PaginationLink>
        </PaginationItem>
      )
    ];

    return (
      <div className="animated fadeIn">
        {
          this.state.isLoading
            ? <Loading />
            : <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Customers
              </CardHeader>
              <CardBody>
                <ToastContainer />
                <Table responsive>
                  <thead>
                    <tr>
                      <th>Customer Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                    </tr>
                  </thead>
                  <tbody>{customersMarkup}</tbody>
                </Table>
                {
                  this.state.customers.length > 0 ? null : <div style={{ textAlign: "center", marginTop: "30px", marginBottom: "30px" }} ><b><p>No customers 😭</p></b></div>
                }
                {
                  this.state.customers.length > 0 &&
                  <Pagination>
                    <PaginationItem>
                      <PaginationLink previous tag="button"></PaginationLink>
                    </PaginationItem>
                    {paginationMarkup}
                    <PaginationItem>
                      <PaginationLink next tag="button"></PaginationLink>
                    </PaginationItem>
                  </Pagination>}
              </CardBody>
            </Card>
        }
      </div>
    );
  }
}

export default Customers;
