import React, { Component, useState, useEffect } from 'react'
import { Form, FormGroup, Input, Button, Card, CardBody, CardFooter, CardHeader, Col, Row } from 'reactstrap'
import { AppSwitch } from '@coreui/react'
import ApiClient from '../../../ApiClient'
import { ToastContainer, toast } from 'react-toastify'
import LoadingButton from "../../Components/LoadingButton";
import Loading from "../../Components/Loading";
import 'react-toastify/dist/ReactToastify.css';

export default props => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [products, setProducts] = useState([]);
  const [imageUrl, setImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalActive, setIsModalActive] = useState(false);
  const [isScreenLoading, setIsScreenLoading] = useState(false);

  useEffect(() => {
    if (props.match.params.collection_id !== undefined) {
      getCollection()
    }
  }, [])

  const createCollection = () => {
    var body = {
      name,
      description,
      products,
      imageUrl
    }

    setIsLoading(true)

    ApiClient.post('@store/collections', body)
      .then(res => {
        const { success, error } = res

        if (success) {
          window.location.href = '/collections'
        } else {
          setIsLoading(false)

          toast.error(error, {
            position: toast.POSITION.TOP_CENTER,
          })
        }
      })
      .catch(() => {

        toast.error("Something went wrong at Quickdine server :(", {
          position: toast.POSITION.TOP_CENTER,
        });

        setIsLoading(false);

      });
  };

  const updateCollection = () => {
    var body = {
      name,
      description,
      products,
      imageUrl
    }

    console.log(body);
    setIsLoading(true)

    ApiClient.put(`@store/collections/${id}`, body)
      .then(res => {
        const { success, error } = res

        if (success) {
          window.location.href = '/collections'
        } else {
          setIsLoading(false)

          toast.error(error, {
            position: toast.POSITION.TOP_CENTER,
          })
        }
      })
      .catch(() => {

        toast.error("Something went wrong at Quickdine server :(", {
          position: toast.POSITION.TOP_CENTER,
        });

        setIsLoading(false);

      });
  };

  const deleteCollection = () => {

    setIsLoading(true)

    ApiClient.del(`@store/collections/${id}`, {})
      .then(res => {
        const { success, error } = res

        if (success) {
          window.location.href = '/collections'
        } else {
          setIsLoading(false)

          toast.error(error, {
            position: toast.POSITION.TOP_CENTER,
          })
        }
      })
      .catch(() => {

        toast.error("Something went wrong at Quickdine server :(", {
          position: toast.POSITION.TOP_CENTER,
        });

        setIsLoading(false);

      });

  };

  const getCollection = () => {
    setIsScreenLoading(true);
    var collection_id = props.match.params.collection_id;

    ApiClient.get(`@store/collections/${collection_id}`)
      .then(res => {
        const { success, collection, message } = res;

        if (success) {

          setId(collection.id);
          setName(collection.name);
          setDescription(collection.description);
          setProducts(collection.products);
          setImageUrl(collection.image_url);

        } else {

          toast.error(message, {
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
  };

  const addImage = file => {
    const reader = new FileReader()

    reader.addEventListener('load', () => setImageUrl(reader.result), false)

    if (file) {
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="animated fadeIn">
      <ToastContainer />
      {
        isScreenLoading
          ? <Loading />
          : <div>
            <Card>
              <CardHeader>
                <strong>Collection</strong>
              </CardHeader>

              <CardBody>
                <Form
                  action=""
                  method="post"
                  encType="multipart/form-data"
                  className="form-horizontal"
                >
                  <FormGroup>
                    <div>
                      <Row md="3">
                        <Col>
                          <strong>Title *</strong>
                        </Col>
                      </Row>
                      <Row xs="12" md="9">
                        <Col>
                          <Input
                            type="text"
                            value={name}
                            placeholder="French Toast"
                            onChange={e => setName(e.target.value)}
                          />
                        </Col>
                      </Row>
                    </div>
                  </FormGroup>

                  <FormGroup>
                    <div>
                      <Row md="3">
                        <Col>
                          <strong>Description</strong>
                        </Col>
                      </Row>
                      <Row xs="12" md="9">
                        <Col>
                          <Input
                            type="textarea"
                            value={description}
                            rows="9"
                            placeholder="Texas Toast batter dipped, grilled to a golden brown and dusted with powdered sugar!"
                            onChange={e => setDescription(e.target.value)}
                          />
                        </Col>
                      </Row>
                    </div>
                  </FormGroup>

                  <FormGroup>
                    <div>
                      <Row md="3">
                        <Col>
                          <strong>Images</strong>
                        </Col>
                      </Row>
                      <Row xs="12" md="9">
                        <Col>
                          {imageUrl == null ? <Input
                            type="file"
                            id="file"
                            name="file"
                            onChange={e => addImage(e.target.files[0])}
                          /> : null}
                        </Col>
                      </Row>
                    </div>
                  </FormGroup>
                </Form>
                <Card>
                  <CardBody>
                    {imageUrl &&
                      <img
                        onClick={e => setImageUrl(null)}
                        src={imageUrl}
                        style={{ maxHeight: "100%", maxWidth: "100%" }}
                      />}
                  </CardBody>
                </Card>
              </CardBody>
              <CardFooter>
                <LoadingButton
                  isLoading={isLoading}
                  text="Save"
                  onClick={id ? updateCollection : createCollection}
                />
              </CardFooter>

            </Card>
            {(props.match.params.collection_id !== 'new') ? <Card>
              <CardBody>
                <LoadingButton
                  isLoading={isLoading}
                  text="Delete"
                  onClick={deleteCollection}
                />
              </CardBody>
            </Card> : null}
          </div>
      }
    </div>
  )
}
