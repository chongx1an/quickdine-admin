import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import ApiClient from '../../../ApiClient';
import { Button, Card, CardBody, Modal, ModalBody, ModalFooter, ModalHeader, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingButton from '../../Buttons/LoadingButton';
import BeatLoader from "react-spinners/BeatLoader";

export default props => {

  useEffect(() => {
    getFirstName();
    listStores();
  }, []);

  const [listIsLoading, setListIsLoading] = useState(false);
  const [createIsLoading, setCreateIsLoading] = useState(false);
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

    setListIsLoading(true);

    ApiClient.get('/admin/stores')
      .then(res => {

        const { success, stores, message } = res;

        if (success) {

          setStores(stores.data);

        } else {

          toast.error(message, {
            position: toast.POSITION.TOP_CENTER,
          });

        }

        setListIsLoading(false);

      })
      .catch(() => {

        toast.error("Something went wrong at Quickdine server :(", {
          position: toast.POSITION.TOP_CENTER,
        });

        setListIsLoading(false);

      });

  };

  const createStore = () => {

    if (storeName !== "") {

      setCreateIsLoading(true);

      var body = {
        name: storeName.trim().replace(/\s\s+/g, ' '),
      }

      ApiClient.post('/admin/stores', body)
        .then(res => {

          const { success, store, message } = res;

          if (success) {

            setStores([...stores, store]);
            setStoreName("");
            toggleModal();

          } else {

            toast.error(message, {
              position: toast.POSITION.TOP_CENTER,
            });

          }

          setCreateIsLoading(false);

        })
        .catch(() => {

          toast.error("Something went wrong at Quickdine server :(", {
            position: toast.POSITION.TOP_CENTER,
          });

          setCreateIsLoading(false);

        });

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
      <ToastContainer />
      <h1 style={{ textAlign: "center" }}>Quickdine</h1>
      <div style={{ height: "5vh" }}></div>
      <h3 style={{ textAlign: "center" }}>Welcome back, {firstName}</h3>
      <div style={{ height: "5vh" }}></div>
      <Row style={{ justifyContent: "center" }}>
        {
          listIsLoading
            ? < BeatLoader
              size={15}
              margin={2}
              color={"#333333"}
            />
            : storesMarkup
        }
      </Row>
      <div style={{ height: "5vh" }}></div>
      <Row className="justify-content-center">
        <Button onClick={toggleModal} className="mr-1" color="primary">Create a new store</Button>
        <Modal isOpen={toggle} toggle={false}>
          <Form onSubmit={createStore} className="needs-validation" action="javascript:void(0)" novalidate>
            <ModalHeader toggle={false}>Create a new store</ModalHeader>
            <ModalBody>

              <InputGroup className="mb-3">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="icon-user"></i>
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  required
                  disabled={createIsLoading}
                  className="form-control"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  type="text"
                  placeholder="Store name"
                />
              </InputGroup>

            </ModalBody>
            <ModalFooter>
              <LoadingButton
                color="secondary"
                isLoading={createIsLoading}
                text="Cancel"
                onClick={toggleModal}
              />
              <LoadingButton
                isLoading={createIsLoading}
                text="Create"
                type="submit"
                onClick={createStore}
              />
            </ModalFooter>
          </Form>
        </Modal>

        <div style={{ width: "2vw" }}></div>
        <Button onClick={logout} >Log out</Button>
      </Row>

    </div >

  );
}
