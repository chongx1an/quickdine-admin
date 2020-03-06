import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Label, PaginationItem, PaginationLink, Row, Table, Button } from 'reactstrap';
import ApiClient from '../../../ApiClient';


class RetrieveCustomer extends Component {

  constructor(props) {

    super(props);

    this.retrieveCustomer = this.retrieveCustomer.bind(this);

    const { match: { params } } = this.props;

    this.state = {
      customerId: params.customer_id,
      customer: {
        firstName: "Ming Sern",
        lastName: "Yeo",
        email: "mingsern@gmail.com",
        phone: "01112314145",
      },
    };

  }

  componentDidMount() {

    this.retrieveCustomer();

  }

  retrieveCustomer() {

    ApiClient.get('@store/customers/' + this.state.customerId)
      .then(res => {

        const { success, customer } = res;

        if (success) {

          this.setState({
            customer: customer,
          });

        } else {

          // TODO: show error

        }

      })
      .catch(console.log);

  }

  render() {

    const { firstName, lastName, email, phone } = this.state.customer;

    const getFullname = () => firstName + " " + lastName;

    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            Customer Profile
          </CardHeader>
          <CardBody>
            <Row>
              <Col md="2">
                <strong>Fullname</strong>
              </Col>
              <Col xs="12" md="9">
                <Label>{getFullname()}</Label>
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
      </div>
    );
  }
}


export default RetrieveCustomer;
