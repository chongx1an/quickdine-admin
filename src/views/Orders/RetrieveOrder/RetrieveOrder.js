import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Label, PaginationItem, PaginationLink, Row, Table, Button } from 'reactstrap';
import ApiClient from '../../../ApiClient';


class RetrieveOrder extends Component {

  constructor(props) {

    super(props);

    this.retrieveOrder = this.retrieveOrder.bind(this);

    const { match: { params } } = this.props;

    this.state = {
      orderId: params.order_id,
      order: {
        number: "2",
        tableNumber: "17",
        customerName: "Ming Sern Yeo",
        totalPrice: "RM 27",
      },
    };

  }

  componentDidMount() {

    this.retrieveOrder();

  }

  retrieveOrder() {

    ApiClient.get('@store/orders/' + this.state.orderId)
      .then(res => {

        const { success, order } = res;

        if (success) {

          this.setState({
            order: order,
          });

        } else {

          // TODO: show error

        }

      })
      .catch(console.log);

  }

  render() {

    const { number, tableNumber, customerName, totalPrice } = this.state.order;

    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            Order Detail
          </CardHeader>
          <CardBody>
            <Row>
              <Col md="2">
                <strong>Order Number</strong>
              </Col>
              <Col xs="12" md="9">
                <Label>#{number}</Label>
              </Col>
            </Row>

            <Row>
              <Col md="2">
                <strong>Table Number</strong>
              </Col>
              <Col xs="12" md="9">
                <Label>{tableNumber}</Label>
              </Col>
            </Row>

            <Row>
              <Col md="2">
                <strong>Customer Name</strong>
              </Col>
              <Col xs="12" md="9">
                <Label>{customerName}</Label>
              </Col>
            </Row>

            <Row>
              <Col md="2">
                <strong>Total Price</strong>
              </Col>
              <Col xs="12" md="9">
                <Label>{totalPrice}</Label>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
    );
  }
}


export default RetrieveOrder;
