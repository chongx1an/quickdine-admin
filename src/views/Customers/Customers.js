import React, { Component } from "react";
import { Card, CardBody, CardHeader, Pagination, PaginationItem, PaginationLink, Table } from "reactstrap";
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
      currentPage: 1,
      lastPage: 1,
    };
  }

  componentDidMount() {
    this.listCustomers();
  }

  listCustomers(page = 1) {
    ApiClient.get("@store/customers?page=" + page)
      .then(res => {
        const { success, customers, error } = res;

        console.log(res);

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

    const pages = lastPage > 1 && [...Array(lastPage).keys()].map((page) => (
      <PaginationItem active={currentPage == page + 1} onClick={() => this.listCustomers(page + 1)}>
        <PaginationLink tag="button">{page + 1}</PaginationLink>
      </PaginationItem>
    ));

    const paginationMarkup = (
      pages &&
      (
        (currentPage - 3 >= 0 && currentPage + 2 <= lastPage)
          ? pages.slice(currentPage - 3, currentPage + 2)
          : currentPage > 5
            ? pages.slice(lastPage - 5)
            : pages.slice(0, 5)
      )
    );

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
                  customers.length > 0 ? null : <div style={{ textAlign: "center", marginTop: "30px", marginBottom: "30px" }} ><b><p>No customers 😭</p></b></div>
                }
                {(customers.length > 0 && lastPage > 1) && (
                  <Pagination>
                    <PaginationItem disabled={currentPage == 1}>
                      <PaginationLink previous tag="button" onClick={() => this.listCustomers(currentPage - 1)}></PaginationLink>
                    </PaginationItem>
                    {paginationMarkup}
                    <PaginationItem disabled={currentPage == lastPage}>
                      <PaginationLink next tag="button" onClick={() => this.listCustomers(currentPage + 1)}></PaginationLink>
                    </PaginationItem>
                  </Pagination>
                )}
              </CardBody>
            </Card>
        }
      </div>
    );
  }
}

export default Customers;
