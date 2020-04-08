import React, { Component, useState, useEffect } from 'react'
import { Form, FormGroup, Input, Button, Card, CardBody, CardFooter, CardHeader, Col, Row } from 'reactstrap'
import { AppSwitch } from '@coreui/react'
import ApiClient from '../../../ApiClient'
import './styles.css'
import { ToastContainer, toast } from 'react-toastify'
import LoadingButton from "../../Components/LoadingButton";
import Loading from "../../Components/Loading";
import 'react-toastify/dist/ReactToastify.css';

// sampleProductData = {

//   name: 'McChicken',
//   description: 'Tasty Chicken Burger',
//   tag: 'Hot Item',
//   price: 10.00,
//   variants: [
//     {
//       type: { name: 'Size' },
//       options: [{ name: 'S', add_price: 0.00 }, { name: 'M', add_price: 0.00 }, { name: 'L', add_price: 0.00 }],
//     },
//     {
//       type: { name: 'Color' },
//       options: [{ name: 'Red', add_price: 0.00 }, { name: 'Green', add_price: 0.00 }, { name: 'Blue', add_price: 0.00 }],
//     }
//   ],

// }

export default props => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0.0);
  const [variants, setVariants] = useState([]);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalActive, setIsModalActive] = useState(false);
  const [isScreenLoading, setIsScreenLoading] = useState(false);

  const addVariant = () =>
    variants.length < 3 &&
    setVariants([...variants, { type: { name: getOptionType(), is_required: false, options_limit: 0 }, options: [] }])

  const editVariantType = (e, index) => {
    var variantsCopy = [...variants]

    variantsCopy[index].type = { name: e.target.value }

    setVariants(variantsCopy)
  }

  const removeVariant = variant => variants.length && setVariants(variants.filter(x => x !== variant))

  const addVariantOption = (e, index) => {
    if (e.target.value !== '') {
      var variantsCopy = [...variants]

      !variantsCopy[index].options.includes(e.target.value) &&
        variantsCopy[index].options.push({
          name: e.target.value,
          add_price: 0.0,
        })

      setVariants(variantsCopy)

      e.target.value = ''
    }
  }

  const removeVariantOption = (i, j) => {
    var variantsCopy = [...variants]

    variantsCopy[i].options.splice(j, 1)

    setVariants(variantsCopy)
  }

  const editOptionName = (i, j, val) => {
    var variantsCopy = [...variants]
    variantsCopy[i].options[i].name = val
    setVariants(variantsCopy)
  }

  const editOptionPrice = (i, j, val) => {
    var variantsCopy = [...variants]
    variantsCopy[i].options[j].add_price = val
    setVariants(variantsCopy)
  }

  useEffect(() => {
    if (props.match.params.product_id !== undefined) {
      getProduct()
    }
  }, [])

  const createProduct = () => {
    var body = {
      name,
      description,
      price,
      variants,
      images,
    }

    setIsLoading(true)

    ApiClient.post('@store/products', body)
      .then(res => {
        const { success, error } = res

        if (success) {
          window.location.href = '/products'
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

  const updateProduct = () => {
    var body = {
      name,
      description,
      price,
      variants,
      images,
    }

    setIsLoading(true)

    ApiClient.put(`@store/products/${id}`, body)
      .then(res => {
        const { success, error } = res

        if (success) {
          window.location.href = '/products'
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

  const getProduct = () => {
    setIsScreenLoading(true);
    var product_id = props.match.params.product_id;

    ApiClient.get(`@store/products/${product_id}`)
      .then(res => {
        const { success, product, message } = res;

        if (success) {

          setId(product.id);
          setName(product.name);
          setDescription(product.description);
          setPrice(product.price);
          setImages(product.images);

          var variants = product.variant_types;

          variants = variants.map(variant => {
            variant.type = { id: variant.id, name: variant.name };
            delete variant.id;
            delete variant.name;
            variant.options = variant.variant_options;
            delete variant.variantOptions;
            return variant;
          });

          setVariants(variants);

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

    reader.addEventListener('load', () => setImages([...images, { url: reader.result }]), false)

    if (file) {
      reader.readAsDataURL(file)
    }
  }

  const getBadgeColor = idx => {
    const colors = ['outline-primary', 'outline-success', 'outline-danger']

    switch (idx) {
      case 0:
        return colors[0]
      case 1:
        return colors[1]
      case 2:
        return colors[2]
      default:
        return colors[Math.floor(Math.random() * colors.length)]
    }
  }

  const getOptionType = () => {
    const types = ['Size', 'Type', 'Sauce']

    switch (variants.length) {
      case 0:
        return types[0]
      case 1:
        return types[1]
      case 2:
        return types[2]
      default:
        return types[0]
    }
  }

  const updateIsRequired = i => {
    var variantsCopy = [...variants]

    variantsCopy[i].type.is_required = !variantsCopy[i].type.is_required

    setVariants(variantsCopy)
  }

  const updateOptionsLimit = (i, e) => {
    if (e.target.value > variants[i].options.length) {
      e.target.value = variants[i].options.length
    }

    if (e.target.value < 0) e.target.value = 0

    var variantsCopy = [...variants]

    variantsCopy[i].type.options_limit = e.target.value

    setVariants(variantsCopy)
  }

  const variantsMarkup =
    variants.length &&
    variants.map((variant, i) => (
      <Row key={i} xs="12" md="9" style={{ marginTop: '1vh', marginBottom: '1vh' }}>
        <Col>
          <Input value={variant.type.name} onChange={e => editVariantType(e, i)} />
        </Col>
        <Col>
          <Row
            style={{
              border: '1px solid #E4E7EA',
              borderRadius: 5,
              justifyContent: 'flex-start',
            }}
          >
            {variant.options &&
              variant.options.map((option, j) => (
                <Button
                  key={j}
                  color={getBadgeColor(i)}
                  onClick={() => removeVariantOption(i, j)}
                  style={{ margin: 5, position: 'relative' }}
                >
                  {option.name}
                </Button>
              ))}
            <Input
              type="text"
              onKeyDown={e => e.key === 'Enter' && addVariantOption(e, i)}
              className="variant-option-input"
            />
          </Row>
        </Col>
        <Col>
          <Button onClick={() => removeVariant(variant)} color="danger">
            Delete
          </Button>
        </Col>
      </Row>
    ))

  const addVariantMarkup = (
    <>
      {variants.length > 0 ? (
        <>
          <Row>
            <Col>
              <strong>Option Type</strong>
            </Col>
            <Col>
              <strong>Option Value</strong>
            </Col>
            <Col />
          </Row>
          {variantsMarkup}
          <br />
          {variants.length < 3 && (
            <p style={{ color: '#6A84F0', cursor: 'pointer' }} onClick={addVariant}>
              Add more option type
            </p>
          )}
        </>
      ) : (
          <>
            <p>Add variants if this product comes in multiple versions, like different sizes or types.</p>
            <Button onClick={addVariant}>Add variants</Button>
          </>
        )}
    </>
  )

  const editVariantMarkup = variants.length > 0 && variants[0].options.length > 0 && (
    <>
      {variants.map((variant, i) => (
        <Card key={i}>
          <CardBody>
            <Row>
              <Col md={4} style={{ marginBottom: '1vh' }}>
                <strong>{variant.type.name}</strong>
              </Col>
              <Col md={3}>
                <strong>Additional Price</strong>
              </Col>
            </Row>
            <Row key={i} style={{ marginTop: '1vh', marginBottom: '1vh' }}>
              <Col>
                {variant.options.map((option, j) => (
                  <Row style={{ marginBottom: '1vh' }} key={j}>
                    <Col md={4}>
                      <Input value={option.name} onChange={e => editOptionName(i, j, e.target.value)} />
                    </Col>
                    <Col md={2}>
                      <Row>
                        <Input
                          type="number"
                          step="1"
                          min="0"
                          placeholder="0.00"
                          value={option.add_price}
                          onChange={e => editOptionPrice(i, j, e.target.value)}
                        />
                      </Row>
                    </Col>
                  </Row>
                ))}
              </Col>
            </Row>
            <Row style={{ alignItems: 'center', marginRight: '1vh', marginLeft: '1vh' }}>
              <p style={{ fontWeight: 'bold', marginRight: '1vh' }}>Options limit</p>
              <Input
                value={variants[i].type.options_limit}
                type="number"
                step="1"
                min="0"
                max={variants[i].options.length}
                placeholder="0"
                onChange={e => updateOptionsLimit(i, e)}
                style={{ marginBottom: '2vh', width: '5%', marginRight: '3vh' }}
              />
              <p style={{ fontWeight: 'bold', marginRight: '1vh' }}>Required</p>
              <div style={{ paddingBottom: 10 }}>
                <AppSwitch
                  variant="3d"
                  color="success"
                  checked={variants[i].type.is_required}
                  onClick={() => updateIsRequired(i)}
                />
              </div>
            </Row>
          </CardBody>
        </Card>
      ))}
    </>
  )

  return (
    <div className="animated fadeIn">
      <ToastContainer />
      {
        isScreenLoading
          ? <Loading />
          : <div>
            <Card>
              <CardHeader>
                <strong>Product</strong>
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
                        <Col md="4">
                          <strong>Title *</strong>
                        </Col>
                        {variants.length <= 0 && (
                          <Col md="4">
                            <strong>Price (RM) *</strong>
                          </Col>
                        )}
                      </Row>
                      <Row md="3">
                        <Col md="4">
                          <Input
                            type="text"
                            value={name}
                            placeholder="French Toast"
                            onChange={e => setName(e.target.value)}
                          />
                        </Col>
                        {variants.length <= 0 && (
                          <Col md="4">
                            <Input
                              value={price}
                              type="number"
                              step="1"
                              min="0"
                              placeholder="15.00"
                              onChange={e => setPrice(e.target.value)}
                            />
                          </Col>
                        )}
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
                          <Input
                            type="file"
                            id="file-multiple-input"
                            name="file-multiple-input"
                            multiple
                            onChange={e => addImage(e.target.files[0])}
                          />
                        </Col>
                      </Row>
                    </div>
                  </FormGroup>
                </Form>
                <Card>
                  <CardBody>
                    <Row>
                      {images.length > 0 &&
                        images.map((img, i) => (
                          <Col md={3} key={i}>
                            <img
                              src={img.url}
                              style={{ maxHeight: "100%", maxWidth: "100%" }}
                            />
                          </Col>
                        ))}
                    </Row>
                  </CardBody>
                </Card>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <strong>Variants</strong>
              </CardHeader>

              <CardBody>
                <FormGroup>
                  <div>
                    {addVariantMarkup}
                    {editVariantMarkup}
                  </div>
                </FormGroup>
              </CardBody>

              <CardFooter>
                <LoadingButton
                  isLoading={isLoading}
                  text="Save"
                  onClick={id ? updateProduct : createProduct}
                />
              </CardFooter>
            </Card>
          </div>
      }
    </div>
  )
}
