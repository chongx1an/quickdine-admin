import React, { Component } from 'react';
import { Button, Badge, Card, CardBody, CardFooter, Col, Row, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import ApiClient from '../../ApiClient';

class Products extends Component {

  constructor(props) {

    super(props);

    this.listProducts = this.listProducts.bind(this);

    this.state = {
      products: this.generateProducts(),
      totalItems: 30,
      currentPage: 1,
    };

  }

  generateProducts() {
    var products = [];
    var names = [
      "Big breakfast",
      "Small breakfast",
      "Lunch Set A",
      "Breakfast Set B",
    ];
    var images = [
      "https://tinyurl.com/rfqgjsb",
      "https://tinyurl.com/wg537ey",
      "https://tinyurl.com/rrscpnw",
      "https://tinyurl.com/qk72g7x",
    ];

    for (let i = 0; i < 20; i++) {
      var table = {
        id: i,
        name: names[Math.floor(Math.random() * names.length)],
        image: images[Math.floor(Math.random() * images.length)],
        price: Math.floor(Math.random() * 30 + 10),
      }

      products.push(table);
    }

    return products;
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

    const viewCreateProductPage = '#/products/new';

    const viewUpdateProductPage = id => window.location.href = "#/products/" + id;

    const productsMarkup = products.length > 0 && products.map((product, index) => (
      <Col xs="12" sm="6" md="2">
        <div onClick={() => viewUpdateProductPage(product.id)} style={{cursor: 'pointer'}}>
          <Card>
            <CardBody style={styles.productCard}>
              <Badge color="danger" style={styles.badge}>Hot Item</Badge>
              <div style={{ height: 'inherit', width: 'inherit', backgroundSize: 'cover', backgroundImage: `url(${product.image})` }}>
              </div>
            </CardBody>
            <CardFooter style={{ textAlign: 'center' }}>
              <b><p>{product.name}</p></b>
              <p>{'RM ' + product.price}</p>
            </CardFooter>
          </Card>
        </div>
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
        <Col>
          <Row style={{ justifyContent: 'flex-end', marginBottom: "3vh", marginRight: "0.2vw" }}>
            <Button href={viewCreateProductPage} color="primary">Add product</Button>
          </Row>
          <Row>
            {productsMarkup}
          </Row>
          <Pagination style={{ position: 'absolute', bottom: 25, right: 5 }}>
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
