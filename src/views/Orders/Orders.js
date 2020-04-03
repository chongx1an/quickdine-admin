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
        const { success, orders, error } = res;

        if (success) {

          this.setState({
            orders: orders.data,
            currentPage: orders.current_page,
            lastPage: orders.last_page
          });

        } else {

          toast.error(error, {
            position: toast.POSITION.TOP_CENTER
          });

        }

        this.setState({ isLoading: false });
      })
      .catch(error => {

        toast.error(error, {
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
        <tr>
          <td>
            <Link to={viewOrderPage(order.id)}>#{order.number}</Link>
          </td>
          <td>{order.table_number}</td>
          <td>{order.customer_name}</td>
          <td>{"RM " + order.total_price}</td>
          <td>
            <Badge color={order.is_paid ? "success" : "danger"}>
              {order.is_paid ? "Paid" : "Pending"}
            </Badge>
          </td>
        </tr>
      ));

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
                {orders.length > 0 && (
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
        }
      </div>
    );
  }
}

export default Orders;
