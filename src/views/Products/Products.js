import React, { Component } from "react";
import {
  Button,
  Badge,
  Card,
  CardHeader,
  FormGroup,
  Input,
  CardBody,
  CardFooter,
  Col,
  Row,
  Pagination,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  PaginationItem,
  Label,
  PaginationLink
} from "reactstrap";
import { AppSwitch } from "@coreui/react";
import ApiClient from "../../ApiClient";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from "../Components/Loading";
import LoadingButton from "../Components/LoadingButton";

class Products extends Component {
  constructor(props) {
    super(props);

    this.listProducts = this.listProducts.bind(this);
    this.listCollections = this.listCollections.bind(this);

    this.state = {
      products: [],
      isLoading: true,
      lastPage: 1,
      currentPage: 1,
      collections: [],
      showAddCollectionButton: false,
      activeCollectionsDialog: false,
      collectionDialogLoading: false,
      addCollectionLoading: false
    };
  }

  componentDidMount() {
    this.listProducts();
    this.listCollections();
  }

  listProducts() {
    ApiClient.get("@store/products")
      .then(res => {
        const { success, products, message } = res;

        if (success) {

          var temps = products.data.map(product => {
            product.isChecked = false
            return product
          })
          this.setState({
            products: temps,
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

  listCollections() {
    this.setState({ collectionDialogLoading: true });
    ApiClient.get("@store/collections")
      .then(res => {
        const { success, collections, error } = res;
        if (success) {

          var temps = collections.data.map((c) => {
            c.isChecked = false
            return c
          })

          this.setState({
            collections: temps
          });

        } else {
          toast.error(error, {
            position: toast.POSITION.TOP_CENTER
          });
        }
        this.setState({ collectionDialogLoading: false });
      })
      .catch(error => {
        toast.error(error, {
          position: toast.POSITION.TOP_CENTER
        });
        this.setState({ collectionDialogLoading: false });
      });
  }

  toggleProductChecked(product) {
    var temps = this.state.products.map(p => {
      if (product.id === p.id) {
        p.isChecked = !p.isChecked
      }
      return p
    });

    var anyChecked = temps.filter((t) => t.isChecked)
    if (anyChecked.length > 0) {
      this.setState({ showAddCollectionButton: true });
    } else {
      this.setState({ showAddCollectionButton: false });
    }
    this.setState({
      products: temps,
    });
  }

  showCollectionsDialog() {
    this.setState({ activeCollectionsDialog: true });
  }

  closeCollectionsDialog() {
    this.setState({ activeCollectionsDialog: false });
  }

  toggleCollectionChecked(collection) {
    var temps = this.state.collections.map(c => {
      if (collection.id === c.id) {
        collection.isChecked = !c.isChecked
      }
      return c
    });

    this.setState({
      collections: temps,
    });
  }

  addToCollections() {

    this.setState({ addCollectionLoading: true })
    var checkedCollections = this.state.collections.filter((c) => c.isChecked)
    var product_ids = this.state.products.filter((p) => p.isChecked).map((p) => p.id)

    checkedCollections.forEach((collection) => {

      var body = {
        name: collection.name,
        description: collection.description,
        product_ids: product_ids,
        imageUrl: collection.image_url,
        source: "product"
      }

      ApiClient.put(`@store/collections/${collection.id}`, body)
        .then(res => {
          const { success, error } = res

          if (success) {
            this.closeCollectionsDialog()
            var temps = this.state.products.map(product => {
              product.isChecked = false
              return product
            })
            this.setState({
              products: temps
            });
          } else {
            this.setState({ addCollectionLoading: false })

            toast.error(error, {
              position: toast.POSITION.TOP_CENTER,
            })
            return
          }
        })
        .catch(() => {

          toast.error("Something went wrong at Quickdine server :(", {
            position: toast.POSITION.TOP_CENTER,
          });

          this.setState({ addCollectionLoading: false })
          return
        });

    })

  }

  render() {
    const { products, lastPage, currentPage } = this.state;

    const viewCreateProductPage = "/products/new";

    const viewUpdateProductPage = productId => "/products/" + productId;

    const productsMarkup =
      products.length > 0 &&
      products.map((product, index) => (
        <Col key={index} xs="12" sm="6" md="2">

          <Card>
            <CardHeader>
              <Row
                style={{
                  justifyContent: "flex-end",
                  marginBottom: "3vh",
                }}
              >
                <FormGroup check className="checkbox">
                  <Input className="form-check-input" type="checkbox" id="checkbox1" name="checkbox1" checked={product.isChecked} onChange={e => this.toggleProductChecked(product)} />
                </FormGroup>
              </Row>


            </CardHeader>
            <Link
              to={viewUpdateProductPage(product.id)}
              style={{ textDecoration: "none", color: "black" }}
            >
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
            </Link>
            <CardFooter style={{ textAlign: "center" }}>
              <b>
                <p>{product.name}</p>
              </b>
              <p>{"RM " + product.price}</p>
            </CardFooter>
          </Card>

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
              (this.state.products.length > 0 && this.state.showAddCollectionButton) &&
              <div style={{ marginRight: "20px" }}>
                <Button onClick={e => this.showCollectionsDialog()} color="primary">Add to collections</Button>
                <Modal centered isOpen={this.state.activeCollectionsDialog}>
                  <ModalHeader>Select collections</ModalHeader>
                  <ModalBody>
                    {
                      this.state.collections.map((collection, index) => {
                        return (
                          <FormGroup key={index} check className="checkbox">
                            <Input checked={collection.isChecked} onChange={e => this.toggleCollectionChecked(collection)} className="form-check-input" type="checkbox" id="checkbox1" name="checkbox1" value="option1" />
                            <Label check className="form-check-label" htmlFor="checkbox1">{collection.name}</Label>
                          </FormGroup>
                        )
                      })
                    }
                  </ModalBody>
                  <ModalFooter>
                    <LoadingButton isLoading={this.state.addCollectionLoading} text={"Add"} color="primary" onClick={e => this.addToCollections()}></LoadingButton>
                    <Button color="secondary" onClick={e => this.closeCollectionsDialog()}>Cancel</Button>
                  </ModalFooter>
                </Modal>
              </div>


            }
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
        {
          products.length > 0 && (
            <Pagination style={{ position: "absolute", bottom: 50, right: 20 }}>
              {paginationMarkup}
            </Pagination>
          )
        }
      </div >
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
