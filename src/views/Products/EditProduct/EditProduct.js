import React, { Component, useState } from 'react';
import { Form, FormGroup, Input, Button, Card, CardBody, CardFooter, CardHeader, Col, Row, ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import ApiClient from '../../../ApiClient';
import './styles.css';

// sampleProductData = {

//   name: 'McChicken',
//   description: 'Tasty Chicken Burger',
//   price: 10.00,
//   type: 'Food',
//   variants: [
//     {
//       type: 'Size',
//       options: ['S', 'M', 'L'],
//     },
//     {
//       type: 'Color',
//       options: ['Red', 'Green', 'Blue'],
//     }
//   ],
//   combinations: [
//     {
//       name: 'S · Red',
//       price: 10.00,
//       image_url: ''
//     },
//     {
//       name: 'S · Blue',
//       price: 10.00,
//       image_url: ''
//     }
//     // Continued...
//   ]

// }


export default props => {

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0.00);
  const [type, setType] = useState('Food');
  const [variants, setVariants] = useState([]);
  const [combinations, setCombinations] = useState([]);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);

  const addVariant = () => variants.length < 3 && setVariants([...variants, { type: getOptionType(), options: [] }]);

  const editVariantType = (e, index) => {

    var variantsCopy = [...variants];

    variantsCopy[index].type = e.target.value;

    setVariants(variantsCopy);

  }

  const removeVariant = variant => variants.length && setVariants(variants.filter(x => x !== variant));

  const addVariantOption = (e, index) => {

    if(e.target.value !== '') {

      var variantsCopy = [...variants];

      !variantsCopy[index].options.includes(e.target.value) && variantsCopy[index].options.push(e.target.value);

      resetCombinations();

      e.target.value = '';

    }

  }

  const removeVariantOption = (i, j) => {

    var variantsCopy = [...variants];

    variantsCopy[i].options.splice(j, 1);

    setVariants(variantsCopy);

    resetCombinations();

  }

  const resetCombinations = () => {

    var combs = [];

    if(variants[2]) {

      variants[0].options.forEach(option0 =>

        variants[1].options.forEach(option1 =>

          variants[2].options.forEach(option2 =>

            combs.push({
              name: `${option0} · ${option1} · ${option2}`,
              price: 0.00,
              image_url: ''
            })

          )

        )

      )

    }

    else if(variants[1]) {

      variants[0].options.forEach(option0 =>

        variants[1].options.forEach(option1 =>

          combs.push({
            name: `${option0} · ${option1}`,
            price: 0.00,
            image_url: ''
          })

        )

      )

    }

    else if(variants[0]) {

      variants[0].options.forEach(option =>

        combs.push({
          name: option,
          price: 0.00,
          image_url: ''
        })

      )

    }

    setCombinations(combs);

  }

  const editVariantPrice = (index, e) => {

    var combinationsCopy = [...combinations];

    combinationsCopy[index].price = e.target.value;

    setVariants(combinationsCopy);

  }

  const createProduct = () => {

    var body = {
      name,
      description,
      type,
      price,
      variants,
      combinations,
    }

    ApiClient.post('@store/products', body)
    .then(res => {

    })
    .catch(console.log);

  }

  const updateProduct = () => {

    var body = {
      name,
      description,
      type,
      price,
      variants,
      combinations,
    }

    ApiClient.put('@store/products', this.state.params)
    .then(res => {

    })
    .catch(console.log);

  }

  const getBadgeColor = idx => {

    const colors = ['outline-primary', 'outline-success', 'outline-danger'];

    switch (idx) {
      case 0:
        return colors[0]
      case 1:
        return colors[1]
      case 2:
        return colors[2]
      default:
        return colors[Math.floor(Math.random() * colors.length)];
    }
  }

  const getOptionType = () => {

    const types = ['Size', 'Type', 'Sauce'];

    switch (variants.length) {
      case 0:
        return types[0];
      case 1:
        return types[1];
      case 2:
        return types[2];
      default:
        return types[0];
    }

  }

  const variantsMarkup = variants.length && variants.map((variant, i) => (
    <Row key={i} xs="12" md="9" style={{ marginTop: "1vh", marginBottom: "1vh" }}>
      <Col>
        <Input type="text" placeholder="Type" value={variant.type} onChange={e => editVariantType(e, i)} />
      </Col>
      <Col>
        <Row style={{border: '1px solid #E4E7EA', borderRadius: 5, justifyContent: 'flex-start'}}>
          {variant.options && variant.options.map((option, j) => (
            <Button key={j} color={getBadgeColor(i)} onClick={() => removeVariantOption(i, j)} style={{margin: 5, position: 'relative'}}>
              {option}
            </Button>
          ))}
          <Input type='text' onKeyDown={e => e.key === 'Enter' && addVariantOption(e, i)} className='variant-option-input' />
        </Row>
      </Col>
      <Col>
        <Button onClick={() => removeVariant(variant)} color="danger">
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
          {variants.length < 3 && <p style={{color: '#6A84F0', cursor: 'pointer'}} onClick={addVariant}>Add more option type</p>}
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
    combinations.length > 0 && combinations.map((combination, i) => (
      <Row key={i} style={{marginTop: '1vh', marginBottom: '1vh'}}>
        <Col>
          <Button color='outline-dark'>{combination.name}</Button>
        </Col>
        <Col>
          <Input type='number' step='1' min='0' placeholder='price' value={combination.price} onChange={e => editVariantPrice(i, e)} />
        </Col>
        <Col />
      </Row>
    ))
  )

  const editVariantMarkup = (
    combinations.length > 0 &&
    <>
      <Row>
        <Col><strong>Variant</strong></Col>
        <Col><strong>Price</strong></Col>
        <Col />
      </Row>
      {variantCombinationMarkup}
    </>
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
                    <Input type="text" placeholder="French Toast" onChange={e => setName(e.target.value)} />
                  </Col>
                  <Col md="4">
                    {/* <Input type="text" id="text-input" name="text-input" placeholder="Food" /> */}
                    <ButtonDropdown isOpen={showTypeDropdown} toggle={() => setShowTypeDropdown(!showTypeDropdown)}>
                      <DropdownToggle caret color='primary' style={{color: '#73818F', backgroundColor: 'white', border: '1px solid #E4E7EA'}}>{type}</DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem onClick={() => setType('Food')}>Food</DropdownItem>
                        <DropdownItem onClick={() => setType('Beverage')}>Beverage</DropdownItem>
                        <DropdownItem onClick={() => setType('Dessert')}>Dessert</DropdownItem>
                      </DropdownMenu>
                    </ButtonDropdown>
                  </Col>
                  {
                    variants.length <= 0 &&
                    <Col md="4">
                      <Input type="number" step="1" min="0" placeholder="15.00" onChange={e => setPrice(e.target.value)} />
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
                    <Input type="textarea" rows="9" placeholder="Texas Toast batter dipped, grilled to a golden brown and dusted with powdered sugar!" onChange={e => setDescription(e.target.value)} />
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
