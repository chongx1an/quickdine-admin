import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../../Components/Loading";
import ApiClient from "../../../ApiClient";

class TableOrders extends Component {
  constructor(props) {
    super(props);

    this.listTableOrders = this.listTableOrders.bind(this);
    const { match: { params } } = this.props;

    this.state = {
      isLoading: true,
      table_id: params.table_id,
      tableOrders: [],
      totalItems: 50,
      currentPage: 1
    }
  }

  componentDidMount() {
    this.listTableOrders();
  }

  listTableOrders() {

    ApiClient.get('@store/tables/' + this.state.table_id + '/orders')
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
    const { tableOrders, totalItems, currentPage } = this.state;

    const buildTableOrders = tableOrders && tableOrders.map((x, i) => (
      <tr>
        <td>{x.number}</td>
        <td>{x.table_number}</td>
        <td>{x.customer_name}</td>
        <td>{'RM ' + x.total_price}</td>
        <td>
          <Badge color={x.is_paid ? 'success' : 'danger'}>{x.is_paid ? 'Paid' : 'Pending'}</Badge>
        </td>
      </tr>
    ));

    return (
      <div className="animated fadeIn">
        <ToastContainer />
        {
          this.state.isLoading
            ? <Loading />
            : <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Simple Table
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>Number</th>
                      <th>Table Number</th>
                      <th>Customer Name</th>
                      <th>Total Price</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {buildTableOrders}
                  </tbody>
                </Table>
                <Pagination>
                  <PaginationItem>
                    <PaginationLink previous tag="button"></PaginationLink>
                  </PaginationItem>
                  <PaginationItem active>
                    <PaginationLink tag="button">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink tag="button">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink tag="button">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink tag="button">4</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink next tag="button"></PaginationLink>
                  </PaginationItem>
                </Pagination>
              </CardBody>
            </Card>
        }
      </div>
    );
  }
}


export default TableOrders;
