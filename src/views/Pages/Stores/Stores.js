import React, { Component, useState } from 'react';
import ApiClient from '../../../ApiClient';
import { AppSwitch } from '@coreui/react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardFooter, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

const generateRandomData = () => {

  var stores = [];

  for (let i = 0; i < 10; i++) {
    var store = {
      id: i + 1,
      name: "Wave",
    }

    stores.push(store);
  }

  return stores;

}

export default props => {

  const [stores, setStores] = useState(generateRandomData());

  const storesMarkup = stores && stores.map((store, index) => (
    <Col md="4" style={{ alignItems: "center", justifyContent: "center" }}>
      <Card style={{ margin: "1vw", height: "20vh" }}>
        <CardBody>
          <h4>{store.name}</h4>
          <Button color="primary" style={{ position: "absolute", bottom: 15, right: 15 }}>Manage this store</Button>
        </CardBody>
      </Card>
    </Col>
  ));

  return (

    <div className="align-items-center" style={{ margin: "20vh" }}>
      <h1 style={{ textAlign: "center" }}>Quickdine</h1>
      <div style={{ height: "5vh" }}></div>
      <h3 style={{ textAlign: "center" }}>Welcome back, cibai</h3>
      <div style={{ height: "5vh" }}></div>
      <Row style={{ justifyContent: "center" }}>
        {storesMarkup}
      </Row>
      <div style={{ height: "5vh" }}></div>
      <Row className="justify-content-center">
        <Button color="primary">Create new store</Button>
        <div style={{ width: "2vw" }}></div>
        <Button>Log out</Button>
      </Row>
    </div>

  );
}
