import React, { useState, useEffect } from 'react';
import { Label, CardFooter, Form, FormGroup, Input, Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import ApiClient from '../../ApiClient';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from "../Components/Loading";
import LoadingButton from '../Components/LoadingButton';

export default props => {

  useEffect(() => {
    getStoreSettings();
  }, []);

  const [id, setId] = useState();
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [address, setAddress] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [isScreenLoading, setIsScreenLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

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

          setId(store.id);
          setName(store.name);
          setDescription(store.description ? store.description : '');
          setAddress(store.address ? store.address : '');
          setEmail(store.email ? store.email : '');
          setPhone(store.phone ? store.phone : '');

        } else {

          toast.error("Something went wrong at Quickdine server :(", {
            position: toast.POSITION.TOP_CENTER,
          });

        }

        setIsScreenLoading(false);

      })
      .catch(() => {

        toast.error("Something went wrong at Quickdine server :(", {
          position: toast.POSITION.TOP_CENTER,
        });

        setIsScreenLoading(false);

      });
  }

  const saveSettings = () => {

    setIsLoading(true);

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

        if (success) {

          toast.success("Save successfully!", {
            position: toast.POSITION.TOP_CENTER,
          });

        } else {

          toast.error("Save failed :(", {
            position: toast.POSITION.TOP_CENTER,
          });

        }

        setIsLoading(false);

      })
      .catch(() => {

        toast.error("Something went wrong at Quickdine server :(", {
          position: toast.POSITION.TOP_CENTER,
        });

        setIsLoading(false);

      });

  }

  const toStoreUrl = () => {
    window.open(`https://quickdine.surge.sh/stores/${id}`, "_blank")
  }

  return (
    <div className="animated fadeIn">
      {
        isScreenLoading
          ? <Loading />
          :
          <div>

            <Row
              style={{
                justifyContent: "flex-end",
                marginBottom: "3vh",
                marginRight: "0.2vw"
              }}
            >
              <LoadingButton
                isLoading={isLoading}
                color="primary"
                text="View store"
                onClick={toStoreUrl}
                iconClassName="cil-house"
              />
            </Row>

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
                      <Input onChange={onChangeName} type="text" id="name" name="text-input" placeholder="Your store name" value={name} />

                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="2">
                      <Label htmlFor="description">Description</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input onChange={onChangeDescription} type="text" id="description" name="text-input" placeholder="Describe your store" value={description} />

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
                      <Label htmlFor="email">Email</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input onChange={onChangeEmail} type="text" id="email" name="text-input" placeholder="Store email" value={email} />

                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="2">
                      <Label htmlFor="phone">Phone</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input onChange={onChangePhone} type="text" id="phone" name="text-input" placeholder="Contact number" value={phone} />

                    </Col>
                  </FormGroup>

                </Form>
              </CardBody>
              <CardFooter>
                <LoadingButton
                  isLoading={isLoading}
                  text="Save"
                  color="primary"
                  onClick={saveSettings}
                  type="submit"
                />
              </CardFooter>
            </Card>

          </div>}
    </div>
  );
}
