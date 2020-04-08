import React, { Component, useState } from 'react';
import { Form, FormGroup, Input, Button, Card, CardBody, CardFooter, CardHeader, Col, Row } from 'reactstrap';
import ApiClient from '../../../ApiClient';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingButton from '../../Components/LoadingButton';


export default props => {

  const [isLoading, setIsLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const onChange = (e) => {

    if (e.target.value > 10) e.target.value = 10;

    if (e.target.value < 1) e.target.value = 1;

    setQuantity(e.target.value);

  }

  const createTable = () => {

    setIsLoading(true);

    var body = {
      quantity: quantity,
    };

    ApiClient.post('@store/tables', body)
      .then(res => {

        const { success, message } = res;

        if (success) {

          window.location.href = "/tables";

        } else {

          toast.error(message, {
            position: toast.POSITION.TOP_CENTER,
          });

          setIsLoading(false);

        }

      })
      .catch(() => {

        toast.error("Something went wrong at Quickdine server :(", {
          position: toast.POSITION.TOP_CENTER,
        });

        setIsLoading(false);

      });

  }

  const container = {
    marginBottom: "3vh",
    marginLeft: "5vh",
    marginRight: "5vh",
  }

  return (
    <div className="animated fadeIn">
      <Card>
        <CardHeader>
          <strong>Add Table</strong>
        </CardHeader>

        <Form onSubmit={createTable} className="needs-validation" action="javascript:void(0)" novalidate>
          <CardBody>
            <ToastContainer />
            <div style={container}>
              <Row md="3">
                <Col md="4"><strong>Quantity *</strong></Col>
              </Row>
              <Row md="3">
                <Col md="4">
                  <Input
                    required
                    disabled={isLoading}
                    onChange={onChange}
                    value={quantity}
                    type="number"
                    min="1"
                    max="15"
                    step="1"
                    placeholder="Number of tables."
                  />
                </Col>
              </Row>
            </div>
          </CardBody>

          <CardFooter>
            <LoadingButton
              isLoading={isLoading}
              type="submit"
              text="Create"
            />
          </CardFooter>

        </Form>
      </Card>

    </div>
  );
}
