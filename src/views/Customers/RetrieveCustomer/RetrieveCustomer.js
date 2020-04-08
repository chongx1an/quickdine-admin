import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Label, Row, PaginationItem, PaginationLink, Table, Badge, Pagination } from 'reactstrap';
import ApiClient from '../../../ApiClient';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../../Components/Loading";

class RetrieveCustomer extends Component {

  constructor(props) {

    super(props);

    this.retrieveCustomer = this.retrieveCustomer.bind(this);

    const { match: { params } } = this.props;

    this.state = {
      isLoading: true,
      customerId: params.customer_id,
      customer: {},
    };

  }

  componentDidMount() {

    this.retrieveCustomer();

  }

  retrieveCustomer() {

    var params = {
      extra: ["orders"],
    }

    ApiClient.get('@store/customers/' + this.state.customerId, params)
      .then(res => {

        const { success, customer } = res;

        console.log(customer);

        if (success) {

          this.setState({
            customer: customer,
          });

        } else {

          toast.error("Something went wrong at Quickdine server :(", {
            position: toast.POSITION.TOP_CENTER,
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

    const { currentPage, lastPage, isLoading, customer } = this.state;
    const { first_name, last_name, email, phone } = this.state.customer;

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

    const customerOrdersMarkup = customer.orders && customer.orders.map((order, index) => (
      <tr key={index}>
        <td>#{order.number} </td>
        <td>{order.table_number}</td>
        <td>{order.customer_name}</td>
        <td>{"RM " + order.total_price}</td>
        <td>
          <Badge color={order.is_paid ? "success" : "danger"}>
            {order.is_paid ? "Paid" : "Pending"}
          </Badge>
        </td>
      </tr>
    ))

    return (
      <div className="animated fadeIn">
        {
          isLoading
            ? <Loading />
            : <>
              <Card>
                <CardHeader>
                  Customer Profile
            </CardHeader>
                <CardBody>
                  <ToastContainer />
                  <Row>
                    <Col md="2">
                      <strong>Fullname</strong>
                    </Col>
                    <Col xs="12" md="9">
                      <Label>{first_name + " " + last_name}</Label>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="2">
                      <strong>Email</strong>
                    </Col>
                    <Col xs="12" md="9">
                      <Label>{email}</Label>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="2">
                      <strong>Phone Number</strong>
                    </Col>
                    <Col xs="12" md="9">
                      <Label>{phone}</Label>
                    </Col>
                  </Row>
                </CardBody>
              </Card>

              <Card>
                <CardHeader>
                  <i className="fa fa-align-justify"></i> Order History
                </CardHeader>
                <CardBody>
                  <ToastContainer />
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>Order Number</th>
                        <th>Table Number</th>
                        <th>Total Price</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>{customerOrdersMarkup}</tbody>
                  </Table>
                  {
                    customer.orders.length > 0
                      ? null
                      : <div style={{ textAlign: "center", marginTop: "30px", marginBottom: "30px" }}>
                        <strong>No orders 😭</strong>
                      </div>
                  }
                  {customer.orders.length > 0 && (
                    <Pagination>
                      <PaginationItem>
                        <PaginationLink previous tag="button"></PaginationLink>
                      </PaginationItem>
                      {paginationMarkup}
                      <PaginationItem>
                        <PaginationLink next tag="button"></PaginationLink>
                      </PaginationItem>
                    </Pagination>
                  )}
                </CardBody>
              </Card>
            </>
        }
      </div>
    );
  }
}


export default RetrieveCustomer;
