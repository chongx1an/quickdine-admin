import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Label, Table, Col, Row } from 'reactstrap';
import { ToastContainer, toast } from "react-toastify";
import { AppSwitch } from '@coreui/react'
import "react-toastify/dist/ReactToastify.css";
import Loading from "../../Components/Loading";
import ApiClient from "../../../ApiClient";
import LoadingButton from '../../Components/LoadingButton';

class TableOrders extends Component {
  constructor(props) {
    super(props);

    this.retrieveTable = this.retrieveTable.bind(this);
    this.deleteTable = this.deleteTable.bind(this);
    this.toggle = this.toggle.bind(this);

    const { match: { params } } = this.props;

    this.state = {
      isScreenLoading: true,
      isLoading: false,
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

        this.setState({ isScreenLoading: false });

      })
      .catch(() => {

        toast.error("Something went wrong at Quickdine server :(", {
          position: toast.POSITION.TOP_CENTER,
        });

        this.setState({ isScreenLoading: false });

      });

  }

  toggle() {

    var table = this.state.table;
    table.is_occupied = !table.is_occupied;

    this.setState({ table: table });

    this.updateTable(table.is_occupied);

  }

  updateTable(isOccupied) {

    var body = {
      is_occupied: isOccupied,
    };

    ApiClient.put('@store/tables/' + this.state.table.id, body)
      .then(res => {

        const { success, table, message } = res;

        if (!success) {

          toast.error(message, {
            position: toast.POSITION.TOP_CENTER,
          });

        }

      })
      .catch(() => {

        toast.error("Something went wrong at Quickdine server :(", {
          position: toast.POSITION.TOP_CENTER,
        });

      });

  }

  deleteTable() {

    this.setState({ isLoading: true });

    ApiClient.del('@store/tables/' + this.state.table_id)
      .then(res => {

        const { success, message } = res;

        if (success) {

          window.location.href = '/tables'

        } else {

          toast.error(message, {
            position: toast.POSITION.TOP_CENTER,
          });

          this.setState({ isLoading: false });

        }

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
          this.state.isScreenLoading
            ? <Loading />
            : <>
              <Row
                style={{
                  justifyContent: "flex-end",
                  marginBottom: "3vh",
                  marginRight: "0.2vw"
                }}
              >
                <LoadingButton
                  isLoading={this.state.isLoading}
                  color="danger"
                  text="Delete table"
                  onClick={this.deleteTable}
                  iconClassName="cui-trash"
                />
              </Row>
              <Card>
                <CardHeader>
                  Table Detail
                </CardHeader>
                <CardBody>
                  <Row>
                    <strong style={{ marginLeft: "30px", width: "160px" }}>Table Number</strong>
                    <Label>{this.state.table.number}</Label>
                  </Row>
                  <Row>
                    <div style={{ marginLeft: "30px", width: "160px" }}>
                      {
                        this.state.table.is_occupied
                          ? <strong>Occupied</strong>
                          : <strong>Available</strong>
                      }
                    </div>
                    <AppSwitch variant={'3d'} color={'danger'} checked={this.state.table.is_occupied} onClick={this.toggle} />
                  </Row>
                </CardBody>
              </Card>

              <Card>
                <CardHeader>
                  <i className="fa fa-align-justify"></i> Order History
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
