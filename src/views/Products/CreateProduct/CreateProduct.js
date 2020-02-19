import React, { Component, useState } from 'react';
import { Form, FormGroup, Input, Button, Card, CardBody, CardFooter, CardHeader, Col, Row } from 'reactstrap';
import ApiClient from '../../../ApiClient';
import './styles.css'


export default props => {

  const [variants, setVariants] = useState([]);

  const addVariant = () => {

    setVariants([...variants, { type: 'Size', options: [] }]);

  }

  const removeVariantType = variant => {

    variants.length > 0 && setVariants(variants.filter((x) => x !== variant));

  }

  const addVariantOption = (e, type) => {

    e.key === 'Enter' && setVariants(variants.map(x => {

      x.type === type && x.options.push({
        name: e.target.value,
        price: 0.00,
        image_url: ''
      });

      e.target.value = '';

      return x;

    }));

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
    <Row key={index} xs="12" md="9" style={{ marginTop: "1vh", marginBottom: "1vh" }}>
      <Col>
        <Input type="text" placeholder="Size" value={variant.type} />
      </Col>
      <Col>
        <Row style={{border: '1px solid #E4E7EA', borderRadius: 5, justifyContent: 'flex-start'}}>
          {variant.options && variant.options.map((option, index) => (
            <Col md={3} key={index} style={{padding: 10}}>
              <Button style={styles.variantBadge}>{option.name}</Button>
            </Col>
          ))}
          <Input type='text' onKeyDown={e => addVariantOption(e, variant.type)} className='variant-option-input' />
        </Row>
      </Col>
      <Col>
        <Button onClick={() => removeVariantType(variant)} color="danger">
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
      <Card>
        <CardHeader>
          <strong>Product</strong>
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
                    <Input type="textarea" name="textarea-input" id="textarea-input" rows="9" placeholder="Type something" />
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
          <strong>Variants</strong>
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
              {/* <Button onClick={addVariantType}>
                Add more option type
              </Button> */}
              <br/>
              <p style={{color: '#6A84F0', cursor: 'pointer'}} onClick={addVariant}>Add more option type</p>
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

const styles = {
  variantBadge: {
    backgroundColor: '#E7F7F1',
    borderColor: '#BDE8D9',
    color: '#14B7B9'
  }
}
