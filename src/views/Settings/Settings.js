import React, { Component, useState, useEffect } from 'react';
import { FormText, Label, CardFooter, Form, FormGroup, Input, Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table, Button } from 'reactstrap';
import ApiClient from '../../ApiClient';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default props => {

  useEffect(() => {
    getStoreSettings();
  }, []);

  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [address, setAddress] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();

  const onChangeName = (e) => {
    setName(e.target.value);
  }
  const onChangeDescription = (e) => {
    setDescription(e.target.value);
  }
  const onChangeAddress = (e) => {
    setAddress(e.target.value);
  }
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  }
  const onChangePhone = (e) => {
    setPhone(e.target.value);
  }

  const getStoreSettings = () => {
    ApiClient.get('@store')
      .then(res => {

        const { success, store } = res;

        if (success) {

          setName(store.name);
          setDescription(store.description);
          setAddress(store.address);
          setEmail(store.email);
          setPhone(store.phone);

        } else {

          toast.error("Something went wrong at Quickdine server :(", {
            position: toast.POSITION.TOP_CENTER,
          });

        }

      })
      .catch(console.log);
  }

  const saveSettings = () => {

    var settings = {
      name: name,
      description: description,
      address: address,
      email: email,
      phone: phone
    };

    ApiClient.put('@store', settings)
      .then(res => {

        const { success, settings } = res;
        console.log(res.success);
        if (success) {
          toast.success("Save successfully!", {
            position: toast.POSITION.TOP_CENTER,
          });
        } else {
          toast.error("Save failed :(", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      })
      .catch(console.log);

  }

  return (
    <div className="animated fadeIn">
      <Card>
        <CardHeader>
          <i className="fa fa-align-justify"></i> Settings
        </CardHeader>
        <CardBody>
          <ToastContainer />
          <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
            <FormGroup row>
              <Col md="2">
                <Label>Store name</Label>
              </Col>
              <Col xs="12" md="9">
                <Input onChange={onChangeName} type="text" id="text-input" name="text-input" placeholder="Your store name" value={name} />

              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="2">
                <Label htmlFor="text-input">Description</Label>
              </Col>
              <Col xs="12" md="9">
                <Input onChange={onChangeDescription} type="text" id="text-input" name="text-input" placeholder="Describe your store" value={description} />

              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="2">
                <Label htmlFor="textarea-input">Address</Label>
              </Col>
              <Col xs="12" md="9">
                <Input onChange={onChangeAddress} type="textarea" name="textarea-input" id="textarea-input" rows="9"
                  placeholder="Address..." value={address} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="2">
                <Label htmlFor="text-input">Email</Label>
              </Col>
              <Col xs="12" md="9">
                <Input onChange={onChangeEmail} type="text" id="text-input" name="text-input" placeholder="Store email" value={email} />

              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="2">
                <Label htmlFor="text-input">Phone</Label>
              </Col>
              <Col xs="12" md="9">
                <Input onChange={onChangePhone} type="text" id="text-input" name="text-input" placeholder="Contact number" value={phone} />

              </Col>
            </FormGroup>

          </Form>
        </CardBody>
        <CardFooter>
          <Button onClick={saveSettings} type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Save</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
