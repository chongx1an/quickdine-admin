import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Label, Row } from 'reactstrap';
import ApiClient from '../../../ApiClient';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

    const { firstName, lastName, email, phone } = this.state.customer;

    const getFullname = () => firstName + " " + lastName;

    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            Customer Profile
          </CardHeader>
          <CardBody>
            <ToastContainer />
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
