import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Label, Row, Table } from 'reactstrap';
import ApiClient from '../../../ApiClient';
import { AppSwitch } from '@coreui/react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from "../../Components/Loading";


class RetrieveOrder extends Component {

  constructor(props) {

    super(props);

    this.retrieveOrder = this.retrieveOrder.bind(this);
    this.updateOrder = this.updateOrder.bind(this);
    this.toggle = this.toggle.bind(this);

    const { match: { params } } = this.props;

    this.state = {
      isLoading: true,
      orderId: params.order_id,
      order: {},
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

  toggle() {

    var order = this.state.order;
    order.is_paid = !order.is_paid;

    this.setState({ order: order });

    this.updateOrder(order.is_paid);

  }

  updateOrder(isPaid) {

    var params = {
      is_paid: isPaid,
    };

    ApiClient.put('@store/orders/' + this.state.orderId, params)
      .then(res => {

        const { success, order } = res;

        if (!success) {

          toast.error("Something went wrong at Quickdine server :(", {
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

    const { number, table, customer, total_price, items, is_paid } = this.state.order;

    const orderItemsMarkup = items && items.map((item, index) => (

      <tr key={index}>
        <td>{item.product_name}</td>
        <td>{item.option_names.join(", ")}</td>
        <td>RM {item.subtotal_price}</td>
        <td>{item.quantity}</td>
        <td>RM {item.quantity * item.subtotal_price}</td>
      </tr>

    ));

    return (
      <div className="animated fadeIn">
        {
          this.state.isLoading
            ? <Loading />
            : <>
              <Card>
                <ToastContainer />
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
                      <Label>
                        {
                          table == null
                            ? "Empty table"
                            : table.number
                        }
                      </Label>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="2">
                      <strong>Customer Name</strong>
                    </Col>
                    <Col xs="12" md="9">
                      <Label>
                        {
                          customer == null
                            ? "Guest"
                            : customer.first_name + " " + customer.last_name
                        }
                      </Label>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="2">
                      <strong>Total Price</strong>
                    </Col>
                    <Col xs="12" md="9">
                      <Label>RM {total_price}</Label>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="2">
                      {
                        is_paid
                          ? <strong>Paid</strong>
                          : <strong>Unpaid</strong>
                      }
                    </Col>
                    <Col xs="12" md="9">
                      <AppSwitch variant={'3d'} color={'primary'} checked={is_paid} onClick={this.toggle} />
                    </Col>
                  </Row>
                </CardBody>
              </Card>

              <Card>
                <CardHeader>
                  <i className="fa fa-align-justify"></i> Order Items
                </CardHeader>
                <CardBody>
                  <ToastContainer />
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>Product Name</th>
                        <th>Variants</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Subtotal Price</th>
                      </tr>
                    </thead>
                    <tbody>{orderItemsMarkup}</tbody>
                  </Table>

                  <hr />

                  <Row
                    style={{
                      justifyContent: "flex-end",
                      marginBottom: "3vh",
                      marginRight: "0.2vw"
                    }}
                  >
                    <Col md="3">
                      <strong>Total Price : RM {total_price}</strong>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </>
        }
      </div>
    );
  }
}


export default RetrieveOrder;
