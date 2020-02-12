import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button, FormText, Badge, Card, CardBody, CardFooter, CardHeader, Col, Row, Collapse, FadePagination, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import ApiClient from '../../../ApiClient';

class Products extends Component {

  constructor(props) {

    super(props);

    this.listProducts = this.listProducts.bind(this);

    this.state = {
      products: Array(18).fill({
        name: 'Sushi',
        image: 'https://1k9ch93e3xh2t4pa12vvmx1t-wpengine.netdna-ssl.com/wp-content/uploads/2017/09/Vegan-sushi-donuts_4483.jpg',
        price: 5
      }),
      totalItems: 30,
      currentPage: 1,
    };

  }

  componentDidMount() {
    this.listProducts();
  }

  listProducts() {

    ApiClient.apiGet('@store/products')
      .then(res => {

        const { products, totalItems, currentPage } = res;

        this.setState({
          products,
          totalItems,
          currentPage
        });

      })
      .catch(console.log);

  }

  render() {

    const { products, totalItems, currentPage } = this.state;

    const productsMarkup = products.length > 0 && products.map((x, i) => (
      <Col xs="12" sm="6" md="2">
        <Card>
          <CardBody style={styles.productCard}>
            <Badge color="danger" style={styles.badge}>Hot Item</Badge>
            <div style={{ height: 'inherit', width: 'inherit', backgroundSize: 'cover', backgroundImage: `url(${x.image})` }}>
            </div>
          </CardBody>
          <CardFooter style={{ textAlign: 'center' }}>
            <b><p>{x.name}</p></b>
            <p>{'RM ' + x.price}</p>
          </CardFooter>
        </Card>
      </Col>
    ));

    var paginationMarkup = [];

    for (var i = 1; i <= (totalItems / 18) + 1; i++) {
      paginationMarkup.push(
        <PaginationItem active={i == currentPage ? true : false}>
          <PaginationLink tag="button">{i}</PaginationLink>
        </PaginationItem>
      );
    }

    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <strong>Create Product</strong>
          </CardHeader>
          <CardBody>
            <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="text-input">Title</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input type="text" id="text-input" name="text-input" placeholder="Give this product a name" />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="email-input">Description</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input type="email" id="email-input" name="email-input" placeholder="Type something" autoComplete="email" />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="password-input">Password</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input type="password" id="password-input" name="password-input" placeholder="Password" autoComplete="new-password" />
                  <FormText className="help-block">Please enter a complex password</FormText>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="date-input">Date Input <Badge>NEW</Badge></Label>
                </Col>
                <Col xs="12" md="9">
                  <Input type="date" id="date-input" name="date-input" placeholder="date" />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="disabled-input">Disabled Input</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input type="text" id="disabled-input" name="disabled-input" placeholder="Disabled" disabled />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="textarea-input">Textarea</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input type="textarea" name="textarea-input" id="textarea-input" rows="9"
                    placeholder="Content..." />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="select">Select</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input type="select" name="select" id="select">
                    <option value="0">Please select</option>
                    <option value="1">Option #1</option>
                    <option value="2">Option #2</option>
                    <option value="3">Option #3</option>
                  </Input>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="selectLg">Select Large</Label>
                </Col>
                <Col xs="12" md="9" size="lg">
                  <Input type="select" name="selectLg" id="selectLg" bsSize="lg">
                    <option value="0">Please select</option>
                    <option value="1">Option #1</option>
                    <option value="2">Option #2</option>
                    <option value="3">Option #3</option>
                  </Input>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="selectSm">Select Small</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input type="select" name="selectSm" id="SelectLm" bsSize="sm">
                    <option value="0">Please select</option>
                    <option value="1">Option #1</option>
                    <option value="2">Option #2</option>
                    <option value="3">Option #3</option>
                    <option value="4">Option #4</option>
                    <option value="5">Option #5</option>
                  </Input>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="disabledSelect">Disabled Select</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input type="select" name="disabledSelect" id="disabledSelect" disabled autoComplete="name">
                    <option value="0">Please select</option>
                    <option value="1">Option #1</option>
                    <option value="2">Option #2</option>
                    <option value="3">Option #3</option>
                  </Input>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="multiple-select">Multiple select</Label>
                </Col>
                <Col md="9">
                  <Input type="select" name="multiple-select" id="multiple-select" multiple>
                    <option value="1">Option #1</option>
                    <option value="2">Option #2</option>
                    <option value="3">Option #3</option>
                    <option value="4">Option #4</option>
                    <option value="5">Option #5</option>
                    <option value="6">Option #6</option>
                    <option value="7">Option #7</option>
                    <option value="8">Option #8</option>
                    <option value="9">Option #9</option>
                    <option value="10">Option #10</option>
                  </Input>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                  <Label>Radios</Label>
                </Col>
                <Col md="9">
                  <FormGroup check className="radio">
                    <Input className="form-check-input" type="radio" id="radio1" name="radios" value="option1" />
                    <Label check className="form-check-label" htmlFor="radio1">Option 1</Label>
                  </FormGroup>
                  <FormGroup check className="radio">
                    <Input className="form-check-input" type="radio" id="radio2" name="radios" value="option2" />
                    <Label check className="form-check-label" htmlFor="radio2">Option 2</Label>
                  </FormGroup>
                  <FormGroup check className="radio">
                    <Input className="form-check-input" type="radio" id="radio3" name="radios" value="option3" />
                    <Label check className="form-check-label" htmlFor="radio3">Option 3</Label>
                  </FormGroup>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                  <Label>Inline Radios</Label>
                </Col>
                <Col md="9">
                  <FormGroup check inline>
                    <Input className="form-check-input" type="radio" id="inline-radio1" name="inline-radios" value="option1" />
                    <Label className="form-check-label" check htmlFor="inline-radio1">One</Label>
                  </FormGroup>
                  <FormGroup check inline>
                    <Input className="form-check-input" type="radio" id="inline-radio2" name="inline-radios" value="option2" />
                    <Label className="form-check-label" check htmlFor="inline-radio2">Two</Label>
                  </FormGroup>
                  <FormGroup check inline>
                    <Input className="form-check-input" type="radio" id="inline-radio3" name="inline-radios" value="option3" />
                    <Label className="form-check-label" check htmlFor="inline-radio3">Three</Label>
                  </FormGroup>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3"><Label>Checkboxes</Label></Col>
                <Col md="9">
                  <FormGroup check className="checkbox">
                    <Input className="form-check-input" type="checkbox" id="checkbox1" name="checkbox1" value="option1" />
                    <Label check className="form-check-label" htmlFor="checkbox1">Option 1</Label>
                  </FormGroup>
                  <FormGroup check className="checkbox">
                    <Input className="form-check-input" type="checkbox" id="checkbox2" name="checkbox2" value="option2" />
                    <Label check className="form-check-label" htmlFor="checkbox2">Option 2</Label>
                  </FormGroup>
                  <FormGroup check className="checkbox">
                    <Input className="form-check-input" type="checkbox" id="checkbox3" name="checkbox3" value="option3" />
                    <Label check className="form-check-label" htmlFor="checkbox3">Option 3</Label>
                  </FormGroup>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                  <Label>Inline Checkboxes</Label>
                </Col>
                <Col md="9">
                  <FormGroup check inline>
                    <Input className="form-check-input" type="checkbox" id="inline-checkbox1" name="inline-checkbox1" value="option1" />
                    <Label className="form-check-label" check htmlFor="inline-checkbox1">One</Label>
                  </FormGroup>
                  <FormGroup check inline>
                    <Input className="form-check-input" type="checkbox" id="inline-checkbox2" name="inline-checkbox2" value="option2" />
                    <Label className="form-check-label" check htmlFor="inline-checkbox2">Two</Label>
                  </FormGroup>
                  <FormGroup check inline>
                    <Input className="form-check-input" type="checkbox" id="inline-checkbox3" name="inline-checkbox3" value="option3" />
                    <Label className="form-check-label" check htmlFor="inline-checkbox3">Three</Label>
                  </FormGroup>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="file-input">File input</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input type="file" id="file-input" name="file-input" />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="file-multiple-input">Multiple File input</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input type="file" id="file-multiple-input" name="file-multiple-input" multiple />
                </Col>
              </FormGroup>
              <FormGroup row hidden>
                <Col md="3">
                  <Label className="custom-file" htmlFor="custom-file-input">Custom file input</Label>
                </Col>
                <Col xs="12" md="9">
                  <Label className="custom-file">
                    <Input className="custom-file" type="file" id="custom-file-input" name="file-input" />
                    <span className="custom-file-control"></span>
                  </Label>
                </Col>
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
}

const styles = {
  badge: {
    position: 'absolute',
    top: 10,
    right: 10
  },
  productCard: {
    height: '20vh',
    padding: 0
  }
}

export default Products;
