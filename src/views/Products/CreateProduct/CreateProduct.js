import React, { Component, useState } from 'react';
import { Form, FormGroup, Input, Button, Card, CardBody, CardFooter, CardHeader, Col, Row } from 'reactstrap';
import ApiClient from '../../../ApiClient';


export default props => {

  const [variants, setVariants] = useState([]);

  const addVariant = () => {

    if (variants.length >= 1) {

      var lastElement = variants[variants.length - 1];

      setVariants([...variants, lastElement + 1]);

    } else {

      setVariants([...variants, 0]);

    }

  }

  const removeVariant = (variant) => {

    setVariants(variants.filter((x) => x != variant));

  }

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

  const variantsMarkup = variants.map((variant, index) => (
    <Row xs="12" md="9" style={{ marginTop: "1vh", marginBottom: "1vh" }}>
      <Col md="3">
        <Input type="text" id={variant} key={index} placeholder="Size" />
      </Col>
      <Col md="5">
        <Input type="text" id={variant} key={index} placeholder="Large" />
      </Col>
      <Col md="3">
        <Input type="text" id={variant} key={index} placeholder="10.00" />
      </Col>
      <Col md="1">
        <Button onClick={() => removeVariant(variant)} color="danger">
          Delete
        </Button>
      </Col>
    </Row>
  ));

  const addVariantMarkup = (
    <div style={container}>
      {
        variants.length == 0
          ? <Button onClick={addVariant}>Add variants</Button>
          : <>
            <Row xs="12" md="9">
              <Col md="3"><strong>Option Type</strong></Col>
              <Col md="5"><strong>Option Value</strong></Col>
              <Col md="3"><strong>Option Price (RM)</strong></Col>
              <Col md="1"></Col>
            </Row>
            {variantsMarkup}
            <Button onClick={addVariant}>Add more option type</Button>
          </>
      }
    </div>
  )

  return (
    <div className="animated fadeIn">
      <Card>
        <CardHeader>
          <strong>Add Product</strong>
        </CardHeader>

        <CardBody>
          <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
            <FormGroup>
              <div style={container}>
                <Row md="3">
                  <Col md="4"><strong>Title *</strong></Col>
                  <Col md="4"><strong>Type *</strong></Col>
                  {
                    variants.length == 0 &&
                    <Col md="4"><strong>Price (RM) *</strong></Col>
                  }
                </Row>
                <Row md="3">
                  <Col md="4">
                    <Input type="text" id="text-input" name="text-input" placeholder="McChicken" />
                  </Col>
                  <Col md="4">
                    <Input type="text" id="text-input" name="text-input" placeholder="Food" />
                  </Col>
                  {
                    variants.length == 0 &&
                    <Col md="4">
                      <Input type="text" id="text-input" name="text-input" placeholder="15.00" />
                    </Col>
                  }
                </Row>
              </div>
            </FormGroup>

            <FormGroup>
              <div style={container}>
                <Row md="3">
                  <Col><strong>Description</strong></Col>
                </Row>
                <Row xs="12" md="9">
                  <Col>
                    <Input type="textarea" name="textarea-input" id="textarea-input" rows="9" placeholder="Content..." />
                  </Col>
                </Row>
              </div>
            </FormGroup>

            <FormGroup>
              <div style={container}>
                <Row md="3">
                  <Col><strong>Images</strong></Col>
                </Row>
                <Row xs="12" md="9">
                  <Col>
                    <Input type="file" id="file-multiple-input" name="file-multiple-input" multiple />
                  </Col>
                </Row>
              </div>
            </FormGroup>
          </Form>
        </CardBody>

      </Card>

      <Card>
        <CardHeader>
          <strong>Add Variants</strong>
        </CardHeader>

        <CardBody>
          <FormGroup col>
            {addVariantMarkup}
          </FormGroup>
        </CardBody>

        <CardFooter>
          <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>
          <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Reset</Button>
        </CardFooter>
      </Card>

    </div>
  );
}
