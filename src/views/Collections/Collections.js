import React, { Component } from "react";
import {
  Col,
  Badge,
  Card,
  CardBody,
  CardHeader,
  Pagination,
  PaginationItem,
  PaginationLink,
  Button,
  Table,
  Row
} from "reactstrap";
import ApiClient from "../../ApiClient";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../Components/Loading";

class Collections extends Component {
  constructor(props) {
    super(props);

    this.listCollections = this.listCollections.bind(this);

    this.state = {
      collections: [],
      isLoading: true,
      lastPage: 1,
      currentPage: 1
    };
  }

  componentDidMount() {
    this.listCollections();
  }

  listCollections() {
    ApiClient.get("@store/collections")
      .then(res => {
        const { success, collections, error } = res;

        if (success) {

          this.setState({
            collections: collections.data,
            currentPage: collections.current_page,
            lastPage: collections.last_page
          });

        } else {

          toast.error(error, {
            position: toast.POSITION.TOP_CENTER
          });

        }

        this.setState({ isLoading: false });
      })
      .catch(error => {

        toast.error(error, {
          position: toast.POSITION.TOP_CENTER
        });

        this.setState({ isLoading: false });

      });
  }

  render() {
    const { collections, lastPage, currentPage } = this.state;

    const viewCollectionPage = collectionId => "/collections/" + collectionId;

    const collectionsMarkup =
      collections &&
      collections.map((collection, index) => (
        <tr key={index}>
          <td>
            <Link to={viewCollectionPage(collection.id)}>{collection.name}</Link>
          </td>
          <td>{collection.description}</td>
          <td>{collection.products.length}</td>
        </tr>
      ));

    var paginationMarkup = [
      currentPage > 1 && (
        <PaginationItem active={false}>
          <PaginationLink tag="button">{currentPage - 1}</PaginationLink>
        </PaginationItem>
      ),
      <PaginationItem active={true}>
        <PaginationLink tag="button">{currentPage}</PaginationLink>
      </PaginationItem>,
      currentPage < lastPage && (
        <PaginationItem active={false}>
          <PaginationLink tag="button">{currentPage + 1}</PaginationLink>
        </PaginationItem>
      )
    ];

    const viewCreateCollectionPage = "/collections/new";
    return (
      <div className="animated fadeIn">
        {
          this.state.isLoading
            ? <Loading />
            :
            <div>
              <Row
                style={{
                  justifyContent: "flex-end",
                  marginBottom: "3vh",
                  marginRight: "0.2vw"
                }}
              >
                {
                  this.state.collections.length > 0 &&
                  <Link to={viewCreateCollectionPage}>
                    <Button color="primary">Add collection</Button>
                  </Link>
                }
              </Row>


              <Card>
                <ToastContainer />
                <CardHeader>
                  <i className="fa fa-align-justify"></i> Collections
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Product amount</th>
                      </tr>
                    </thead>
                    <tbody>{collectionsMarkup}</tbody>
                  </Table>
                  {
                    this.state.collections.length > 0 ?
                      null :
                      <div style={{ textAlign: "center", marginTop: "30px", marginBottom: "30px" }} >
                        <b><p>No collections, lets create one</p></b>
                        <Link to={viewCreateCollectionPage}>
                          <Button color="primary">Add collection</Button>
                        </Link>
                      </div>
                  }
                  {collections.length > 0 && (
                    <Pagination>
                      <PaginationItem>
                        <PaginationLink previous tag="button"></PaginationLink>
                      </PaginationItem>
                      {paginationMarkup}
                      <PaginationItem>
                        <PaginationLink next tag="button"></PaginationLink>
                      </PaginationItem>
                    </Pagination>
                  )}
                </CardBody>
              </Card>
            </div>
        }
      </div>
    );
  }
}

export default Collections;
