import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Label, Row } from 'reactstrap';
import ApiClient from '../../../ApiClient';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../../Components/Loading";

class RetrieveCustomer extends Component {

  constructor(props) {

    super(props);

    this.retrieveCustomer = this.retrieveCustomer.bind(this);

    const { match: { params } } = this.props;

    this.state = {
      isLoading: true,
      customerId: params.customer_id,
      customer: {},
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

    const { first_name, last_name, email, phone } = this.state.customer;

    return (
      <div className="animated fadeIn">
        {
          this.state.isLoading
            ? <Loading />
            : <Card>
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
                    <Label>{first_name + " " + last_name}</Label>
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
        }
      </div>
    );
  }
}


export default RetrieveCustomer;
