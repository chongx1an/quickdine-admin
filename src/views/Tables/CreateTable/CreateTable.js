import React, { Component, useState } from 'react';
import { Form, FormGroup, Input, Button, Card, CardBody, CardFooter, CardHeader, Col, Row } from 'reactstrap';
import ApiClient from '../../../ApiClient';


export default props => {

  const createTable = () => {

    var body = {
      quantity: 0,
    };

    ApiClient.post('@store/tables', body)
      .then(res => {

        const { success, tables } = res;

      })
      .catch(console.log);

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

        <CardBody>
          <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
            <FormGroup>
              <div style={container}>
                <Row md="3">
                  <Col md="4"><strong>Quantity *</strong></Col>
                </Row>
                <Row md="3">
                  <Col md="4">
                    <Input type="number" min="0" max="10" step="1" placeholder="Enter the number of tables you want to create." />
                  </Col>
                </Row>
              </div>
            </FormGroup>
          </Form>
        </CardBody>

        <CardFooter>
          <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>
          <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Reset</Button>
        </CardFooter>

      </Card>

    </div>
  );
}
