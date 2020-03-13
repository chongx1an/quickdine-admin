import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import ApiClient from '../../../ApiClient';
import { Button, Card, CardBody, Modal, ModalBody, ModalFooter, ModalHeader, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

export default props => {

  useEffect(() => {
    getFirstName();
    listStores();
  }, []);

  const [stores, setStores] = useState([]);
  const [firstName, setFirstName] = useState("Admin");
  const [toggle, setToggle] = useState(false);
  const [storeName, setStoreName] = useState("");

  const getFirstName = () => {

    var admin = Cookies.get("admin");

    admin = JSON.parse(admin);

    setFirstName(admin.first_name);

  }

  const listStores = () => {

    ApiClient.get('/admin/stores')
      .then(res => {

        const { success, stores } = res;

        if (success) {

          setStores(stores.data);

        } else {

          // TODO: show error message

        }

      })
      .catch(console.log);

  };

  const createStore = () => {

    if (storeName !== "") {

      var body = {
        name: storeName,
      }

      ApiClient.post('/admin/stores', body)
        .then(res => {

          const { success, store } = res;

          if (success) {

            setStores([...stores, store]);
            toggleModal();

          } else {

            // TODO: show error message

          }

        })
        .catch(console.log);

    }

  }

  const loginStore = (storeId) => {

    Cookies.set("store_id", storeId, { expires: 365 });
    window.location.href = "/";

  }

  const toggleModal = () => {

    setToggle(!toggle);

  }

  const logout = () => {

    Cookies.remove("token");
    Cookies.remove("admin");
    window.location.href = "/";

  }

  const storesMarkup = stores && stores.map((store, index) => (
    <Col md="4" style={{ alignItems: "center", justifyContent: "center" }}>
      <Card style={{ margin: "1vw", height: "20vh" }}>
        <CardBody>
          <h4>{store.name}</h4>
          <Button onClick={() => loginStore(store.id)} color="primary" style={{ position: "absolute", bottom: 15, right: 15 }}>Manage this store</Button>
        </CardBody>
      </Card>
    </Col>
  ));

  return (

    <div className="align-items-center" style={{ margin: "20vh" }}>
      <h1 style={{ textAlign: "center" }}>Quickdine</h1>
      <div style={{ height: "5vh" }}></div>
      <h3 style={{ textAlign: "center" }}>Welcome back, {firstName}</h3>
      <div style={{ height: "5vh" }}></div>
      <Row style={{ justifyContent: "center" }}>
        {storesMarkup}
      </Row>
      <div style={{ height: "5vh" }}></div>
      <Row className="justify-content-center">
        <Button onClick={toggleModal} className="mr-1" color="primary">Create a new store</Button>

        <Form className="needs-validation" action="javascript:void(0)">
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
              <Button color="secondary" onClick={toggleModal} >Cancel</Button>
              <Button color="primary" onClick={createStore} type="submit">Create</Button>
            </ModalFooter>
          </Modal>
        </Form>

        <div style={{ width: "2vw" }}></div>
        <Button onClick={logout} >Log out</Button>
      </Row>
    </div>

  );
}
