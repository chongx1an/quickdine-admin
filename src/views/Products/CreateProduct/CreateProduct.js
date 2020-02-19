import React, { Component, useState } from 'react';
import { Form, FormGroup, Input, Button, Card, CardBody, CardFooter, CardHeader, Col, Row } from 'reactstrap';
import ApiClient from '../../../ApiClient';
import './styles.css'


export default props => {

  const [variants, setVariants] = useState([]);
  const [combinations, setCombinations] = useState([]);

  const addVariant = () => {

    setVariants([...variants, { type: 'Size', options: [], combinations: [] }]);

  }

  const editVariantType = (e, index) => {

    var variantsCopy = [...variants];

    variantsCopy[index].type = e.target.value;

    setVariants(variantsCopy);

  }

  const removeVariantType = variant => {

    variants.length && setVariants(variants.filter((x) => x !== variant));

  }

  const addVariantOption = (e, index) => {

    var variantsCopy = [...variants];

    variantsCopy[index].options.push(e.target.value);

    variantsCopy[index].combinations.forEach(combination => {

      variantsCopy[index].combinations.push({
        name: `${combination.name} · ${e.target.value}`,
        price: 0.00,
        image_url: ''
      });

    });

    variantsCopy[index].combinations.push({
      name: e.target.value,
      price: 0.00,
      image_url: ''
    });

    setVariants(variantsCopy);

    e.target.value = '';

  }

  const editVariantPrice = (variantIdx, combinationIdx, e) => {

    var variantsCopy = [...variants];

    console.log(e.target.value)

    variantsCopy[variantIdx].combinations[combinationIdx].price = e.target.value;

    setVariants(variantsCopy);

  }

  const createProduct = () => {

    ApiClient.apiPost('@store/products', this.state.params)
      .then(res => {

        const { success, product } = res;

      })
      .catch(console.log);

  }

  const getBadgeColor = idx => {

    const colors = ['outline-primary', 'outline-success', 'outline-danger', 'outline-warning', 'outline-dark'];

    switch (idx) {
      case 0:
        return colors[0]
      case 1:
        return colors[1]
      case 2:
        return colors[2]
      case 3:
        return colors[3]
      case 4:
        return colors[4]
      default:
        return colors[Math.floor(Math.random() * colors.length)];
    }
  }

  const container = {
    marginBottom: "3vh",
    marginLeft: "5vh",
    marginRight: "5vh",
  }

  const variantsMarkup = variants.length && variants.map((variant, i) => (
    <Row key={i} xs="12" md="9" style={{ marginTop: "1vh", marginBottom: "1vh" }}>
      <Col>
        <Input type="text" placeholder="Type" value={variant.type} onChange={e => editVariantType(e, i)} />
      </Col>
      <Col>
        <Row style={{border: '1px solid #E4E7EA', borderRadius: 5, justifyContent: 'flex-start'}}>
          {variant.options && variant.options.map((option, j) => (
            <Col md={3} key={j} style={{padding: 10}}>
              <Button color={getBadgeColor(i)}>{option}</Button>
            </Col>
          ))}
          <Input type='text' onKeyDown={e => e.key === 'Enter' && addVariantOption(e, i)} className='variant-option-input' />
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
    <>
      {
        variants.length
        ?
        <>
          <Row>
            <Col><strong>Option Type</strong></Col>
            <Col><strong>Option Value</strong></Col>
            <Col />
          </Row>
          {variantsMarkup}
          <br/>
          <p style={{color: '#6A84F0', cursor: 'pointer'}} onClick={addVariant}>Add more option type</p>
        </>
        :
        <>
          <p>Add variants if this product comes in multiple versions, like different sizes or types.</p>
          <Button onClick={addVariant}>Add variants</Button>
        </>
      }
    </>
  )

  const variantCombinationMarkup = (
    variants.length && variants.map((variant, i) => (
      variant.combinations.map((combination, j) => (
        <Row key={j} style={{marginTop: '1vh', marginBottom: '1vh'}}>
          <Col>
            <Button color={getBadgeColor(i)}>{combination.name}</Button>
          </Col>
          <Col>
            <Input type='number' step='1' placeholder='price' value={combination.price} onChange={e => editVariantPrice(i, j, e)} />
          </Col>
          <Col />
        </Row>
      ))
    ))
  )

  const editVariantMarkup = (
    variants.length && <>
      <Row>
        <Col><strong>Variant</strong></Col>
        <Col><strong>Price</strong></Col>
        <Col />
      </Row>
      {variantCombinationMarkup}
    </>
  )


  // const editVariantMarkup = variants.length && variants.map((variant, i) => (
  //   variants.combinations.length && variants.combinations.map((combination, j) => (
  //     <Row key={j}>
  //       <Col>
  //         <p>{combination.name}</p>
  //       </Col>
  //       <Col>
  //         <p>{combination.price}</p>
  //       </Col>
  //     </Row>
  //   ))
  // ));

  return (
    <div className="animated fadeIn">
      <Card>
        <CardHeader>
          <strong>Product</strong>
        </CardHeader>

        <CardBody>
          <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
            <FormGroup>
              <div>
                <Row md="3">
                  <Col md="4"><strong>Title *</strong></Col>
                  <Col md="4"><strong>Type *</strong></Col>
                  {
                    variants.length <= 0 &&
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
                    variants.length <= 0 &&
                    <Col md="4">
                      <Input type="text" id="text-input" name="text-input" placeholder="15.00" />
                    </Col>
                  }
                </Row>
              </div>
            </FormGroup>

            <FormGroup>
              <div>
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
              <div>
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
          <FormGroup>
            <div>
              {addVariantMarkup}
              {editVariantMarkup}
            </div>
          </FormGroup>
        </CardBody>

        <CardFooter>
          <Button type="submit" size="sm" color="primary" style={{marginRight: 20}}><i className="fa fa-dot-circle-o"></i> Submit</Button>
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
