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
import ApiClient from "../../ApiClient";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from "../Components/Loading";

class Products extends Component {
  constructor(props) {
    super(props);

    this.listProducts = this.listProducts.bind(this);


    this.state = {
      products: [],
      isLoading: true,
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
        const { success, products, message } = res;

        if (success) {
          console.log(products);
          this.setState({
            products: products.data,
            lastPage: products.last_page,
            currentPage: products.current_page
          });

        } else {

          toast.error(message, {
            position: toast.POSITION.TOP_CENTER,
          });

        }

        this.setState({ isLoading: false });

      })
      .catch(() => {

        toast.error("Something went wrong at Quickdine server :(", {
          position: toast.POSITION.TOP_CENTER,
        });

        this.setState({ isLoading: false });

      });
  }

  render() {
    const { products, lastPage, currentPage } = this.state;

    const viewCreateProductPage = "/products/new";

    const viewUpdateProductPage = productId => "/products/" + productId;

    const productsMarkup =
      products.length > 0 &&
      products.map((product, index) => (
        <Col key={index} xs="12" sm="6" md="2">
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
        <ToastContainer />
        <Col>
          <Row
            style={{
              justifyContent: "flex-end",
              marginBottom: "3vh",
              marginRight: "0.2vw"
            }}
          >
            {
              this.state.products.length > 0 &&
              <Link to={viewCreateProductPage}>
                <Button color="primary">Add product</Button>
              </Link>
            }
          </Row>
          {
            this.state.isLoading ? <Loading /> : (this.state.products.length > 0 ?
              <Row>{productsMarkup}</Row> :
              <div style={{ textAlign: "center", paddingTop: "30px" }}>
                <b>
                  <p>No products, let's create one 🤘</p>
                </b>
                <Link to={viewCreateProductPage}>
                  <Button color="primary">Add product</Button>
                </Link>
              </div>)
          }
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
