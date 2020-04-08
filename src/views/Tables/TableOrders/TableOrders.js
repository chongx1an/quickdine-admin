import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Pagination, PaginationItem, PaginationLink, Table, Col, Row } from 'reactstrap';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../../Components/Loading";
import ApiClient from "../../../ApiClient";

class TableOrders extends Component {
  constructor(props) {
    super(props);

    this.listTableOrders = this.listTableOrders.bind(this);
    // this.generateData = this.generateData.bind(this);
    const { match: { params } } = this.props;

    this.state = {
      isLoading: true,
      table_id: params.table_id,
      tableOrders: [],
      totalItems: 50,
      currentPage: 1,
      lastPage: 1,
    }
  }

  componentDidMount() {
    this.listTableOrders();
  }

  // generateData(page) {

  //   var orders = [];

  //   for (let index = 0 + (15 * (page - 1)); index < (15 * (page - 1)) + 15; index++) {
  //     var order = {
  //       number: "#" + index,
  //       customer_name: "blah",
  //       total_price: "5.00",
  //       is_paid: true,
  //     };

  //     orders.push(order);
  //   }

  //   this.setState({
  //     tableOrders: orders,
  //     isLoading: false,
  //     currentPage: page,
  //   });

  // }

  listTableOrders(page = 1) {

    ApiClient.get('@store/tables/' + this.state.table_id + '/orders?page=' + page)
      .then(res => {

        const { success, orders, message } = res;

        console.log(res);

        if (success) {

          this.setState({
            tableOrders: orders.data,
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
    const { tableOrders, totalItems, currentPage, lastPage } = this.state;

    const tableOrdersMarkup = tableOrders && tableOrders.map((x, i) => (
      <tr>
        <td>{x.number}</td>
        <td>{x.customer_name}</td>
        <td>{'RM ' + x.total_price}</td>
        <td>
          <Badge color={x.is_paid ? 'success' : 'danger'}>{x.is_paid ? 'Paid' : 'Pending'}</Badge>
        </td>
      </tr>
    ));

    const pages = lastPage > 1 && [...Array(lastPage).keys()].map((page) => (
      <PaginationItem active={currentPage == page + 1} onClick={() => this.listTableOrders(page + 1)}>
        <PaginationLink tag="button">{page + 1}</PaginationLink>
      </PaginationItem>
    ));

    const paginationMarkup = (
      pages &&
      (
        (currentPage - 3 >= 0 && currentPage + 2 <= lastPage)
          ? pages.slice(currentPage - 3, currentPage + 2)
          : currentPage > 5
            ? pages.slice(lastPage - 5)
            : pages.slice(0, 5)
      )
    );

    return (
      <div className="animated fadeIn">
        <ToastContainer />
        {
          this.state.isLoading
            ? <Loading />
            : <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Table Orders
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>Number</th>
                      <th>Customer Name</th>
                      <th>Total Price</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>{tableOrdersMarkup}</tbody>
                </Table>
                {
                  tableOrders.length > 0
                    ? <></>
                    : <Row md={12} style={{ alignItems: "center", justifyContent: 'center', margin: '30px' }}>
                      <div>
                        <b>
                          <p>No orders from this table 😗</p>
                        </b>
                      </div>
                    </Row>
                }
                {(tableOrders.length > 0 && lastPage > 1) && (
                  <Pagination>
                    <PaginationItem disabled={currentPage == 1}>
                      <PaginationLink previous tag="button" onClick={() => this.listTableOrders(currentPage - 1)}></PaginationLink>
                    </PaginationItem>
                    {paginationMarkup}
                    <PaginationItem disabled={currentPage == lastPage}>
                      <PaginationLink next tag="button" onClick={() => this.listTableOrders(currentPage + 1)}></PaginationLink>
                    </PaginationItem>
                  </Pagination>
                )}
              </CardBody>
            </Card>
        }
      </div>
    );
  }
}


export default TableOrders;
