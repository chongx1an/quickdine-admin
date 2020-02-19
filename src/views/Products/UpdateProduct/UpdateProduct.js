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
          ?
          <>
            <p>Add variants if this product comes in multiple versions, like different sizes or types.</p>
            <Button onClick={addVariant}>Add variants</Button>
          </>
          :
          <>
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
      <strong>FUCKKKKKk</strong>
    </div>
  );
}
