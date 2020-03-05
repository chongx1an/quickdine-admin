import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import ApiClient from '../../../ApiClient';
import { Button, Card, CardBody, Modal, ModalBody, ModalFooter, ModalHeader, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

// const generateRandomData = () => {

//   var stores = [];

//   for (let i = 0; i < 10; i++) {
//     var store = {
//       id: i + 1,
//       name: "Wave",
//     }

//     stores.push(store);
//   }

//   return stores;

// }

export default props => {

  useEffect(() => {
    getUsername();
    listStores();
  }, []);

  const [stores, setStores] = useState([]);
  const [username, setUsername] = useState("Admin");
  const [toggle, setToggle] = useState(false);
  const [storeName, setStoreName] = useState("");

  const getUsername = () => {

    var user = Cookies.get("user");

    user = JSON.parse(user);

    setUsername(user.first_name);

  }

  const listStores = () => {

    ApiClient.get('/stores')
      .then(res => {

        const { success, stores } = res;

        if (success) {

          setStores([...stores]);

        } else {



        }

      })
      .catch(console.log);

  };

  const createStore = () => {

    var body = {
      name: storeName,
    }

    ApiClient.post('/stores', body)
      .then(res => {

        const { success, store } = res;

        console.table(res);

      })
      .catch(console.log);

  }

  const toggleModal = () => {

    setToggle(!toggle);

  }

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
      <h3 style={{ textAlign: "center" }}>Welcome back, {username}</h3>
      <div style={{ height: "5vh" }}></div>
      <Row style={{ justifyContent: "center" }}>
        {storesMarkup}
      </Row>
      <div style={{ height: "5vh" }}></div>
      <Row className="justify-content-center">
        <Button onClick={toggleModal} className="mr-1" color="primary">Create a new store</Button>

        <Form className="needs-validation" action="javascript:void(0)" novalidate>
          <Modal isOpen={toggle} toggle={toggleModal}>
            <ModalHeader toggle={toggleModal}>Create a new store</ModalHeader>
            <ModalBody>

              <InputGroup className="mb-3">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="icon-user"></i>
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  required
                  className="form-control"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  type="text"
                  placeholder="Store name"
                />
              </InputGroup>

            </ModalBody>
            <ModalFooter>
              <Button color="secondary">Cancel</Button>
              <Button color="primary" onClick={createStore} type="submit">Create</Button>
            </ModalFooter>
          </Modal>
        </Form>

        <div style={{ width: "2vw" }}></div>
        <Button>Log out</Button>
      </Row>
    </div>

  );
}
