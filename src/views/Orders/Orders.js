import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table, Button } from 'reactstrap';
import ApiClient from '../../ApiClient';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';


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

  // generateData() {
  //   var products = [];

  //   for (var i = 0; i < 20; i++) {
  //     var product = {
  //       id: i + 1,
  //       number: 20 - i,
  //       table_number: Math.floor(Math.random() * 20) + 1,
  //       customer_name: Math.random() > 0.5 ? 'Jian Yong' : 'Ming Sern',
  //       total_price: Math.round(Math.random() * 200, 2),
  //       is_paid: Math.random() > 0.5 ? true : false,
  //     }

  //     products.push(product);
  //   }

  //   return products;
  // }

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
      .catch(console.log);

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
