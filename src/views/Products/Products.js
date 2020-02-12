import React, { Component } from 'react';
import { Button, Badge, Card, CardBody, CardFooter, CardHeader, Col, Row, Collapse, FadePagination, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import ApiClient from '../../ApiClient';

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

    const createProductPage = '#/products/create';

    return (
      <div className="animated fadeIn">
        <Col>
          <Row>
            <a href={createProductPage}>
              <Button color="primary" >Add product</Button>
            </a>
          </Row>
          <Row>
            {productsMarkup}
          </Row>
          <Pagination style={{ position: 'fixed', bottom: 55, right: 15 }}>
            <PaginationItem>
              <PaginationLink previous tag="button"></PaginationLink>
            </PaginationItem>
            {paginationMarkup}
            <PaginationItem>
              <PaginationLink next tag="button"></PaginationLink>
            </PaginationItem>
          </Pagination>

        </Col>
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
