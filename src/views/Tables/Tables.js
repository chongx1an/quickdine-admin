import React, { Component } from 'react';
import { Badge, Card, CardBody, CardFooter, DropdownItem, Col, Row, Button, DropdownToggle, DropdownMenu, UncontrolledDropdown } from 'reactstrap';
import ApiClient from '../../ApiClient';

class Tables extends Component {
  constructor(props) {
    super(props);

    this.listTables = this.listTables.bind(this);

    this.state = {
      tables: this.generateRandomData(),
      totalItems: 50,
      currentPage: 1
    }
  }

  componentDidMount() {
    // this.listTables();
  }

  listTables() {
    ApiClient.apiGet('@store/tables')
      .then(res => {

        const { tables, totalItems, currentPage } = res;

        this.setState({
          tables,
          totalItems,
          currentPage
        });

      })
      .catch(console.log);
  }

  generateRandomData() {
    var tables = [];

    for (let i = 0; i < 20; i++) {
      var table = {
        id: i,
        number: i + 1,
        is_occupied: Math.floor(Math.random() * 2 + 1) % 2 ? true : false,
      }

      tables.push(table);
    }

    return tables;
  }


  render() {

    const { tables, totalItems, currentPage } = this.state;

    const viewTableOrdersPage = (id) => "#/tables/" + id + "/orders";

    const viewUpdateTablePage = (id) => "#/tables/" + id;

    const viewCreateTablePage = "#/tables/create";

    const tablesMarkup = tables && tables.map((value, index) => {
      return <Col key={index} xs="12" sm="6" md="2">
        <UncontrolledDropdown>
          <DropdownToggle nav style={styles.toggle}>
            <Card>
              <CardBody style={{
                height: '20vh',
                backgroundColor: value.is_occupied ? 'lightGrey' : 'white',
              }}>
                <div style={styles.text}>
                  <h4>Table</h4>
                  <h1>{value.number}</h1>
                </div>
              </CardBody>
              <CardFooter style={{
                textAlign: 'center',
                fontWeight: 'bold',
                color: value.is_occupied ? "red" : "green"
              }}>{value.is_occupied ? "Occupied" : "Open"}</CardFooter>
            </Card>
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem href={viewTableOrdersPage(value.id)}><i className="fa fa-info"></i>View table orders</DropdownItem>
            <DropdownItem href={viewUpdateTablePage(value.id)}><i className="fa fa-edit"></i>Edit table</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Col >
    })

    return (
      <div className="animated fadeIn" >
        <Row style={styles.button}>
          <Button href={viewCreateTablePage} color="primary">Add table</Button>
        </Row>
        <Row>
          {tablesMarkup}
        </Row>
      </div>
    )
  }
}

const styles = {
  text: {
    textAlign: 'center',
    alignItems: 'center',
    color: 'grey'
  },

  toggle: {
    margin: 0,
    padding: 0
  },

  button: {
    justifyContent: 'flex-end',
    marginBottom: "3vh",
    marginRight: "0.2vw"
  }
}


export default Tables;
