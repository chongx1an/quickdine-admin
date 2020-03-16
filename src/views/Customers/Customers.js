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

class Customers extends Component {
  constructor(props) {
    super(props);

    this.listCustomers = this.listCustomers.bind(this);

    this.state = {
      customers: this.generateData(),
      totalItems: 50,
      currentPage: 1
    };
  }

  generateData() {
    var customers = [];

    for (var i = 0; i < 20; i++) {
      var customer = {
        id: i + 1,
        name: Math.random() > 0.5 ? "Jian Yong" : "Ming Sern",
        email:
          Math.random() > 0.5 ? "jianyong@gmail.com" : "mingsern@gmail.com",
        phone: Math.floor(Math.random() * 9000000000) + 1000000000
      };

      customers.push(customer);
    }

    return customers;
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
      })
      .catch(error => {
        toast.error(error, {
          position: toast.POSITION.TOP_CENTER
        });
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
        <Card>
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
            <Pagination>
              <PaginationItem>
                <PaginationLink previous tag="button"></PaginationLink>
              </PaginationItem>
              {paginationMarkup}
              <PaginationItem>
                <PaginationLink next tag="button"></PaginationLink>
              </PaginationItem>
            </Pagination>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default Customers;
