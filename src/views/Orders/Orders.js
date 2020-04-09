import React, { Component } from "react";
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table
} from "reactstrap";
import ApiClient from "../../ApiClient";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../Components/Loading";

class Orders extends Component {
  constructor(props) {
    super(props);

    this.listOrders = this.listOrders.bind(this);

    this.state = {
      orders: [],
      isLoading: true,
      lastPage: 1,
      currentPage: 1
    };
  }

  componentDidMount() {
    this.listOrders();
  }

  listOrders() {
    ApiClient.get("@store/orders")
      .then(res => {
        const { success, orders } = res;

        console.log(res);

        if (success) {

          this.setState({
            orders: orders.data,
            currentPage: orders.current_page,
            lastPage: orders.last_page
          });

        } else {

          toast.error("Something went wrong at Quickdine server :(", {
            position: toast.POSITION.TOP_CENTER
          });

        }

        this.setState({ isLoading: false });
      })
      .catch(error => {

        toast.error("Something went wrong at Quickdine server :(", {
          position: toast.POSITION.TOP_CENTER
        });

        this.setState({ isLoading: false });

      });
  }

  render() {
    const { orders, lastPage, currentPage } = this.state;

    const viewOrderPage = orderId => "/orders/" + orderId;

    const ordersMarkup =
      orders &&
      orders.map((order, index) => (
        <tr key={index}>
          <td>
            <Link to={viewOrderPage(order.id)}>#{order.number}</Link>
          </td>
          <td>
            {
              order.table == null
                ? "Empty table"
                : order.table.number
            }
          </td>
          <td>
            {
              order.customer == null
                ? "Guest"
                : order.customer.first_name + " " + order.customer.last_name
            }
          </td>
          <td>{"RM " + order.total_price}</td>
          <td>
            <Badge color={order.is_paid ? "success" : "danger"}>
              {order.is_paid ? "Paid" : "Pending"}
            </Badge>
          </td>
        </tr>
      ));

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
              <ToastContainer />
              <CardHeader>
                <i className="fa fa-align-justify"></i> Orders
                </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>Order Number</th>
                      <th>Table Number</th>
                      <th>Customer Name</th>
                      <th>Total Price</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>{ordersMarkup}</tbody>
                </Table>
                {
                  this.state.orders.length > 0 ? null : <div style={{ textAlign: "center", marginTop: "30px", marginBottom: "30px" }} ><b><p>No orders 😭</p></b></div>
                }
                {(orders.length > 0 && lastPage > 1) && (
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

export default Orders;
