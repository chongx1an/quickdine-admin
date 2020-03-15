import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Pagination, PaginationItem, PaginationLink, Table } from 'reactstrap';
import ApiClient from '../../ApiClient';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Orders extends Component {

  constructor(props) {

    super(props);

    this.listOrders = this.listOrders.bind(this);

    this.state = {
      orders: [],
      totalItems: 50,
      currentPage: 1,
    };

  }

  componentDidMount() {

    this.listOrders();

  }

  listOrders() {

    ApiClient.get('@store/orders')
      .then(res => {

        const { success, orders, message } = res;

        if (success) {

          this.setState({
            orders: orders,
          });

        } else {

          toast.error(message, {
            position: toast.POSITION.TOP_CENTER,
          });

        }

      })
      .catch(() => {

        toast.error("Something went wrong at Quickdine server :(", {
          position: toast.POSITION.TOP_CENTER,
        });

      });

  }

  render() {

    const { orders, totalItems, currentPage } = this.state;

    const viewOrderPage = (orderId) => "/orders/" + orderId;

    const ordersMarkup = orders && orders.map((order, index) => (
      <tr>
        <td>
          <Link to={viewOrderPage(order.id)}>#{order.number}</Link>
        </td>
        <td>{order.table_number}</td>
        <td>{order.customer_name}</td>
        <td>{'RM ' + order.total_price}</td>
        <td>
          <Badge color={order.is_paid ? 'success' : 'danger'}>{order.is_paid ? 'Paid' : 'Pending'}</Badge>
        </td>
      </tr>
    ));

    return (
      <div className="animated fadeIn">
        <Card>
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
              <tbody>
                {ordersMarkup}
              </tbody>
            </Table>
            <Pagination>
              <PaginationItem>
                <PaginationLink previous tag="button"></PaginationLink>
              </PaginationItem>
              <PaginationItem active>
                <PaginationLink tag="button">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink tag="button">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink tag="button">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink tag="button">4</PaginationLink>
              </PaginationItem>
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


export default Orders;
