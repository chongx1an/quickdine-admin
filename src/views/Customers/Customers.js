import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table, Button } from 'reactstrap';
import ApiClient from '../../ApiClient';


class Customers extends Component {

  constructor(props) {
    super(props);

    this.listCustomers = this.listCustomers.bind(this);

    this.state = {
      customers: this.generateData(),
      totalItems: 50,
      currentPage: 1,
    };
  }

  generateData() {
    var customers = [];

    for (var i = 0; i < 20; i++) {
      var customer = {
        name: Math.random() > 0.5 ? 'Jian Yong' : 'Ming Sern',
        email: Math.random() > 0.5 ? 'jianyong@gmail.com' : 'mingsern@gmail.com',
        phone: Math.floor(Math.random() * 9000000000) + 1000000000,
      }

      customers.push(customer);
    }

    return customers;
  }

  componentDidMount() {
    // this.listCustomers();
  }

  listCustomers() {
    ApiClient.get('@store/customers')
      .then(res => {

        const { customers, totalItems, currentPage } = res;

        this.setState({
          customers,
          totalItems,
          currentPage
        });

      })
      .catch(console.log);
  }

  render() {

    const { customers, totalItems, currentPage } = this.state;

    const buildCustomers = customers && customers.map((customer, index) => {
      return <tr key={index}>
        <td>{customer.name}</td>
        <td>{customer.email}</td>
        <td>{customer.phone}</td>
      </tr>
    });

    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <i className="fa fa-align-justify"></i> Customers
          </CardHeader>
          <CardBody>
            <Table responsive>
              <thead>
                <tr>
                  <th>Customer Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                </tr>
              </thead>
              <tbody>
                {buildCustomers}
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


export default Customers;
