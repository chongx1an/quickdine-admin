import React, { Component, useState } from 'react';
import { FormText, Label, CardFooter, Form, FormGroup, Input, Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table, Button } from 'reactstrap';
import ApiClient from '../../ApiClient';



export default props => {

  const [name, setName] = useState("Caaaa");
  const [description, setDescription] = useState("Wow come");
  const [address, setAddress] = useState("Lot -1, Level 102, Low Valley Mega Mall");
  const [email, setEmail] = useState("caaaa@gmail.com");
  const [phone, setPhone] = useState("017-8276272");


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

  const saveSettings = () => {

    var settings = {
      name: name,
      description: description,
      address: address,
      email: email,
      phone: phone
    };

    console.log(settings);

    ApiClient.put('@store', settings)
      .then(res => {
        console.log(res);
        const { success, settings } = res;

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
          <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
            <FormGroup row>
              <Col md="2">
                <Label>Store name</Label>
              </Col>
              <Col xs="12" md="9">
                <Input onChange={onChangeName} type="text" id="text-input" name="text-input" placeholder="Text" value={name} />

              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="2">
                <Label htmlFor="text-input">Description</Label>
              </Col>
              <Col xs="12" md="9">
                <Input onChange={onChangeDescription} type="text" id="text-input" name="text-input" placeholder="Text" value={description} />

              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="2">
                <Label htmlFor="textarea-input">Address</Label>
              </Col>
              <Col xs="12" md="9">
                <Input onChange={onChangeAddress} type="textarea" name="textarea-input" id="textarea-input" rows="9"
                  placeholder="Content..." value={address} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="2">
                <Label htmlFor="text-input">Email</Label>
              </Col>
              <Col xs="12" md="9">
                <Input onChange={onChangeEmail} type="text" id="text-input" name="text-input" placeholder="Text" value={email} />

              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="2">
                <Label htmlFor="text-input">Phone</Label>
              </Col>
              <Col xs="12" md="9">
                <Input onChange={onChangePhone} type="text" id="text-input" name="text-input" placeholder="Text" value={phone} />

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
