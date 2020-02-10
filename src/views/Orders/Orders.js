import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import ApiClient from '../../ApiClient';


class Orders extends Component {

   constructor(props) {

    super(props);

    this.listOrders = this.listOrders.bind(this);

    this.state = {
      orders: this.generateData(),
      totalItems: 50,
      currentPage: 1,
    };

  }

  generateData() {
    var products = [];
    for(var i = 0; i < 20; i++) {
      var product = {
        number: i + 1,
        table_number: Math.floor(Math.random() * 20) + 1,
        customer_name: Math.random() > 0.5 ? 'Jian Yong' : 'Ming Sern',
        total_price: Math.round(Math.random() * 200, 2),
        is_paid: Math.random() > 0.5 ? true : false,
      }
      products.push(product);
    }
    return products;
  }

  componentDidMount() {
    this.listOrders();
  }

  listOrders() {

    ApiClient.apiGet('@store/orders')
    .then(res => {

      const { orders, totalItems, currentPage } = res;

      this.setState({
        orders,
        totalItems,
        currentPage
      });

    })
    .catch(console.log);

  }

  render() {

    const { orders, totalItems, currentPage } = this.state;

    const ordersMarkup = orders && orders.map((x, i) => (
      <tr>
        <td>{x.number}</td>
        <td>{x.table_number}</td>
        <td>{x.customer_name}</td>
        <td>{'RM ' + x.total_price}</td>
        <td>
          <Badge color={x.is_paid ? 'success' : 'danger'}>{x.is_paid ? 'Paid' : 'Pending'}</Badge>
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
                  <th>Number</th>
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
