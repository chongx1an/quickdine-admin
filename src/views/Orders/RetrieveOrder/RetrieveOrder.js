import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Label, Row } from 'reactstrap';
import ApiClient from '../../../ApiClient';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from "../../Components/Loading";


class RetrieveOrder extends Component {

  constructor(props) {

    super(props);

    this.retrieveOrder = this.retrieveOrder.bind(this);

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

        console.log(order);

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

  render() {

    const { number, table, customer, total_price } = this.state.order;

    return (
      <div className="animated fadeIn">
        {
          this.state.isLoading
            ? <Loading />
            : <Card>
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
              </CardBody>
            </Card>
        }
      </div>
    );
  }
}


export default RetrieveOrder;
