import React, { Component } from "react";
import {
  Button,
  Badge,
  Card,
  CardBody,
  CardFooter,
  Col,
  Row,
  Pagination,
  PaginationItem,
  PaginationLink
} from "reactstrap";
import { AppSwitch } from "@coreui/react";
import ApiClient from "../../ApiClient";
import { Link } from "react-router-dom";

class Products extends Component {
  constructor(props) {
    super(props);

    this.listProducts = this.listProducts.bind(this);

    this.state = {
      products: [],
      lastPage: 1,
      currentPage: 1
    };
  }

  componentDidMount() {
    this.listProducts();
  }

  listProducts() {
    ApiClient.get("@store/products")
      .then(res => {
        const { success, products } = res;

        if (success) {
          this.setState({
            products: products.data,
            lastPage: products.last_page,
            currentPage: products.current_page
          });
        } else {
          // TODO: show error
        }
      })
      .catch(console.log);
  }

  render() {
    const { products, lastPage, currentPage } = this.state;

    const viewCreateProductPage = "/products/new";

    const viewUpdateProductPage = productId => "/products/" + productId;

    const productsMarkup =
      products.length > 0 &&
      products.map((product, index) => (
        <Col xs="12" sm="6" md="2">
          <Link
            to={viewUpdateProductPage(product.id)}
            style={{ textDecoration: "none", color: "black" }}
          >
            <Card>
              <CardBody style={styles.productCard}>
                {product.tag && (
                  <Badge color="danger" style={styles.badge}>
                    {product.tag}
                  </Badge>
                )}
                <div
                  style={{
                    height: "inherit",
                    width: "inherit",
                    backgroundSize: "cover",
                    backgroundImage: `url(${
                      product.images.length
                        ? product.images[0].url
                        : "https://tinyurl.com/wgr44k7"
                    })`
                  }}
                ></div>
              </CardBody>
              <CardFooter style={{ textAlign: "center" }}>
                <b>
                  <p>{product.name}</p>
                </b>
                <p>{"RM " + product.price}</p>
              </CardFooter>
            </Card>
          </Link>
        </Col>
      ));

    // var paginationMarkup = [];

    // for (var i = 1; i <= (totalItems / 18) + 1; i++) {
    //   paginationMarkup.push(
    //     <PaginationItem active={i === currentPage ? true : false}>
    //       <PaginationLink tag="button">{i}</PaginationLink>
    //     </PaginationItem>
    //   );
    // }

    var paginationMarkup =
      (currentPage > 1 &&
        ((
          <PaginationItem>
            <PaginationLink previous tag="button" />
          </PaginationItem>
        ),
        (
          <PaginationItem active={false}>
            <PaginationLink tag="button">{currentPage - 1}</PaginationLink>
          </PaginationItem>
        )),
      (
        <PaginationItem active={true}>
          <PaginationLink tag="button">{currentPage}</PaginationLink>
        </PaginationItem>
      ),
      currentPage < lastPage &&
        ((
          <PaginationItem active={false}>
            <PaginationLink tag="button">{currentPage + 1}</PaginationLink>
          </PaginationItem>
        ),
        (
          <PaginationItem>
            <PaginationLink next tag="button" />
          </PaginationItem>
        )));

    return (
      <div className="animated fadeIn">
        <Col>
          <Row
            style={{
              justifyContent: "flex-end",
              marginBottom: "3vh",
              marginRight: "0.2vw"
            }}
          >
            <Link to={viewCreateProductPage}>
              <Button color="primary">Add product</Button>
            </Link>
          </Row>
          <Row>{productsMarkup}</Row>
        </Col>
        {products.length > 0 && (
          <Pagination style={{ position: "absolute", bottom: 50, right: 20 }}>
            {paginationMarkup}
          </Pagination>
        )}
      </div>
    );
  }
}

const styles = {
  badge: {
    position: "absolute",
    top: 10,
    right: 10
  },
  productCard: {
    height: "20vh",
    padding: 0
  }
};

export default Products;
