import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Label, Table, Col, Row } from 'reactstrap';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../../Components/Loading";
import ApiClient from "../../../ApiClient";

class TableOrders extends Component {
  constructor(props) {
    super(props);

    this.retrieveTable = this.retrieveTable.bind(this);
    const { match: { params } } = this.props;

    this.state = {
      isLoading: true,
      table_id: params.table_id,
      table: {},
      totalItems: 50,
      currentPage: 1,
      lastPage: 1,
    }
  }

  componentDidMount() {
    this.retrieveTable();
  }

  retrieveTable() {

    ApiClient.get('@store/tables/' + this.state.table_id)
      .then(res => {

        const { success, table, message } = res;

        console.log(res)

        if (success) {

          this.setState({ table: table });

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

    const tableOrdersMarkup = this.state.table.orders && this.state.table.orders.map((order, index) => (
      <tr key={index}>
        <td>{order.number}</td>
        <td>{order.customer_name}</td>
        <td>{'RM ' + order.total_price}</td>
        <td>
          <Badge color={order.is_paid ? 'success' : 'danger'}>{order.is_paid ? 'Paid' : 'Pending'}</Badge>
        </td>
      </tr>
    ));

    return (
      <div className="animated fadeIn">
        <ToastContainer />
        {
          this.state.isLoading
            ? <Loading />
            : <>
              <Card>
                <CardHeader>
                  Table Detail
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col md="2">
                      <strong>Table Number</strong>
                    </Col>
                    <Col xs="12" md="9">
                      <Label>{this.state.table.number}</Label>
                    </Col>
                  </Row>
                </CardBody>
              </Card>

              <Card>
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
                    this.state.table.orders.length > 0
                      ? <></>
                      : <Row md={12} style={{ alignItems: "center", justifyContent: 'center', margin: '30px' }}>
                        <div>
                          <b>
                            <p>No orders from this table 😗</p>
                          </b>
                        </div>
                      </Row>
                  }
                </CardBody>
              </Card>
            </>
        }
      </div>
    );
  }
}


export default TableOrders;
