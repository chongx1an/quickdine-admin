import React, { Component, useState } from 'react';
import { Form, FormGroup, Input, Button, Card, CardBody, CardFooter, CardHeader, Col, Row } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import ApiClient from '../../../ApiClient';


export default props => {

  const createProduct = () => {

    ApiClient.apiPost('@store/products', this.state.params)
      .then(res => {

        const { success, product } = res;

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
          <strong>Edit Table</strong>
        </CardHeader>

        <CardBody>
          <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
            <FormGroup>
              <div style={container}>
                <Row md="3">
                  <Col md="4"><strong>Table number *</strong></Col>
                  <Col md="4"><strong>Is occupied</strong></Col>
                </Row>
                <Row md="3">
                  <Col md="4">
                    <Input type="text" id="text-input" name="text-input" placeholder="#1" />
                  </Col>
                  <Col md="4">
                    <AppSwitch className={'mx-1'} variant={'3d'} color={'warning'} defaultChecked />
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
