import React, { Component, useState } from 'react';
import { Form, FormGroup, Input, Button, Card, CardBody, CardFooter, CardHeader, Col, Row } from 'reactstrap';
import ApiClient from '../../../ApiClient';


export default props => {

  const [variants, setVariants] = useState([0]);

  const addVariant = () => {

    var lastElement = variants[variants.length - 1];

    setVariants([...variants, lastElement + 1]);

  }

  const removeVariant = (variant) => {

    if (variants.length > 1) {

      setVariants(variants.filter((x) => x != variant));

    }

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
      <Col>
        <Input type="text" id={variant} key={index} placeholder="Size" />
      </Col>
      <Col>
        <Input type="text" id={variant} key={index} placeholder="Large" />
      </Col>
      <Col>
        <Button onClick={() => removeVariant(variant)} color="danger">
          Delete
        </Button>
      </Col>
    </Row>
  ));

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
                  <Col><strong>Title *</strong></Col>
                  <Col><strong>Type *</strong></Col>
                </Row>
                <Row md="3">
                  <Col>
                    <Input type="text" id="text-input" name="text-input" placeholder="Give this product a name" />
                  </Col>
                  <Col>
                    <Input type="text" id="text-input" name="text-input" placeholder="Give this product a type" />
                  </Col>
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
            <div style={container}>
              <Row xs="12" md="9">
                <Col><strong>Option Type</strong></Col>
                <Col><strong>Option Value</strong></Col>
                <Col></Col>
              </Row>
              {variantsMarkup}
              <Button onClick={addVariant}>
                Add more option type
              </Button>
            </div>
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
