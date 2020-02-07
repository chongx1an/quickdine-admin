import React, { Component } from 'react';
import { Badge, Card, CardBody, CardFooter, CardHeader, Col, Row, Collapse, Fade } from 'reactstrap';


class Tables extends Component {
  constructor(props) {
    super(props);

    this.listTables = this.listTables.bind(this);
    this.generateRandomData = this.generateRandomData.bind(this);

    this.state = {
      tables: this.generateRandomData(),
    }
  }

  componentDidMount() {
    this.listTables();
    this.generateRandomData();
  }

  listTables() {
    // TODO: list tables
  }

  generateRandomData() {
    var tables = [];

    for (let i = 0; i < 20; i++) {
      var table = {
        number: i + 1,
        is_occupied: Math.floor(Math.random() * 2 + 1) % 2 ? true : false,
      }

      tables.push(table);
    }

    return tables;
  }


  render() {

    const viewTableOrders = '#/tables/1';

    const table_text = {
      textAlign: 'center',
      alignItems: 'center',
    }

    const table_link = {
      textDecoration: 'none',
      color: 'grey',
    }

    const build_tables = this.state.tables.map((value, index) => {
      return <Col key={index} xs="12" sm="6" md="2">
        <a href={viewTableOrders} style={table_link}>
          <Card>
            <CardBody style={{
              height: '20vh',
              backgroundColor: value.is_occupied ? 'lightGrey' : 'white',
            }}>
              <div style={table_text}>
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
        </a>
      </Col >
    })

    return (
      <div className="animated fadeIn" >
        <Row>
          {build_tables}
        </Row>
      </div>
    )
  }
}


export default Tables;
