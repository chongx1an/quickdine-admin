import React, { Component, useState, useEffect } from "react";
import {
  Form,
  FormGroup,
  Input,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Row,
  ButtonDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import ApiClient from "../../../ApiClient";
import "./styles.css";
import { ToastContainer, toast } from "react-toastify";
import LoadingButton from "../../Buttons/LoadingButton";
import EditVariantDialog from "./EditVariantDialog";

// sampleProductData = {

//   name: 'McChicken',
//   description: 'Tasty Chicken Burger',
//   price: 10.00,
//   variants: [
//     {
//       type: { name: 'Size' },
//       options: [{ name: 'S' }, { name: 'M' }, { name: 'L' }],
//     },
//     {
//       type: { name: 'Color' },
//       options: [{ name: 'Red' }, { name: 'Green' }, { name: 'Blue' }],
//     }
//   ],
//   combinations: [
//     {
//       price: 10.00,
//       option_values: ['S', 'Red']
//     },
//     {
//       price: 10.00,
//       option_values: ['S', 'Blue']
//     }
//     // Continued...
//   ]

// }

export default props => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0.0);
  const [variants, setVariants] = useState([]);
  const [combinations, setCombinations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalActive, setIsModalActive] = useState(false);

  const addVariant = () =>
    variants.length < 3 &&
    setVariants([
      ...variants,
      { type: { name: getOptionType() }, options: [] }
    ]);

  const editVariantType = (e, index) => {
    var variantsCopy = [...variants];

    variantsCopy[index].type = { name: e.target.value };

    setVariants(variantsCopy);
  };

  const removeVariant = variant =>
    variants.length && setVariants(variants.filter(x => x !== variant));

  const addVariantOption = (e, index) => {
    if (e.target.value !== "") {
      var variantsCopy = [...variants];

      !variantsCopy[index].options.includes(e.target.value) &&
        variantsCopy[index].options.push({ name: e.target.value });

      resetCombinations();

      e.target.value = "";
    }
  };

  const removeVariantOption = (i, j) => {
    var variantsCopy = [...variants];

    variantsCopy[i].options.splice(j, 1);

    setVariants(variantsCopy);

    resetCombinations();
  };

  const resetCombinations = () => {
    var combs = [];

    if (variants[2]) {
      variants[0].options.forEach(option0 =>
        variants[1].options.forEach(option1 =>
          variants[2].options.forEach(option2 =>
            combs.push({
              option_values: [option0, option1, option2].map(x => x.name),
              price: 0.0
            })
          )
        )
      );
    } else if (variants[1]) {
      variants[0].options.forEach(option0 =>
        variants[1].options.forEach(option1 =>
          combs.push({
            option_values: [option0, option1].map(x => x.name),
            price: 0.0
          })
        )
      );
    } else if (variants[0]) {
      variants[0].options.forEach(option =>
        combs.push({
          option_values: [option.name],
          price: 0.0
        })
      );
    }

    setCombinations(combs);
  };

  const editVariantPrice = (index, e) => {
    var combinationsCopy = [...combinations];

    combinationsCopy[index].price = e.target.value;

    setCombinations(combinationsCopy);
  };

  useEffect(() => {
    if (props.match.params.product_id !== "new") {
      getProduct();
    }
  }, []);

  const createProduct = () => {
    var body = {
      name,
      description,
      price,
      variants,
      combinations
    };

    setIsLoading(true);

    ApiClient.post("@store/products", body)
      .then(res => {
        const { success, error } = res;

        if (success) {
          window.location.href = "/products";
        } else {
          setIsLoading(false);

          toast.error(error, {
            position: toast.POSITION.TOP_CENTER
          });
        }
      })
      .catch(console.log);
  };

  const updateProduct = () => {
    var body = {
      name,
      description,
      price,
      variants: combinations
    };

    setIsLoading(true);

    ApiClient.put(`@store/products/${id}`, body)
      .then(res => {
        const { success, error } = res;

        if (success) {
          window.location.href = "/products";
        } else {
          setIsLoading(false);

          toast.error(error, {
            position: toast.POSITION.TOP_CENTER
          });
        }
      })
      .catch(console.log);
  };

  const getProduct = () => {
    var product_id = props.match.params.product_id;

    ApiClient.get(`@store/products/${product_id}`)
      .then(res => {
        const { success, product } = res;

        setId(product.id);
        setName(product.name);
        setDescription(product.description);
        setPrice(product.price);

        var combinations = product.variants;

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

        var options = variants.map(variant => variant.options).flat();

        combinations = combinations.map(combination => {
          var option_values = combination.options
            .split(", ")
            .map(x => x.split("_")[1]);

          option_values = option_values.map(
            x => options.filter(option => option.id == x)[0].name
          );

          combination.option_values = option_values;

          return combination;
        });

        console.log(combinations);

        setCombinations(combinations);
      })
      .catch(console.log);
  };

  const getBadgeColor = idx => {
    const colors = ["outline-primary", "outline-success", "outline-danger"];

    switch (idx) {
      case 0:
        return colors[0];
      case 1:
        return colors[1];
      case 2:
        return colors[2];
      default:
        return colors[Math.floor(Math.random() * colors.length)];
    }
  };

  const getOptionType = () => {
    const types = ["Size", "Type", "Sauce"];

    switch (variants.length) {
      case 0:
        return types[0];
      case 1:
        return types[1];
      case 2:
        return types[2];
      default:
        return types[0];
    }
  };

  const variantsMarkup =
    variants.length &&
    variants.map((variant, i) => (
      <Row
        key={i}
        xs="12"
        md="9"
        style={{ marginTop: "1vh", marginBottom: "1vh" }}
      >
        <Col>
          <Input
            value={variant.type.name}
            onChange={e => editVariantType(e, i)}
          />
        </Col>
        <Col>
          <Row
            style={{
              border: "1px solid #E4E7EA",
              borderRadius: 5,
              justifyContent: "flex-start"
            }}
          >
            {variant.options &&
              variant.options.map((option, j) => (
                <Button
                  key={j}
                  color={getBadgeColor(i)}
                  onClick={() => removeVariantOption(i, j)}
                  style={{ margin: 5, position: "relative" }}
                >
                  {option.name}
                </Button>
              ))}
            <Input
              type="text"
              onKeyDown={e => e.key === "Enter" && addVariantOption(e, i)}
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
    ));

  const addVariantMarkup = (
    <>
      {variants.length ? (
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
            <p
              style={{ color: "#6A84F0", cursor: "pointer" }}
              onClick={addVariant}
            >
              Add more option type
            </p>
          )}
        </>
      ) : (
        <>
          <p>
            Add variants if this product comes in multiple versions, like
            different sizes or types.
          </p>
          <Button onClick={addVariant}>Add variants</Button>
        </>
      )}
    </>
  );

  const variantCombinationMarkup =
    combinations.length > 0 &&
    combinations.map((combination, i) => (
      <Row key={i} style={{ marginTop: "1vh", marginBottom: "1vh" }}>
        <Col>
          <Button color="outline-dark">
            {combination.option_values.join(" · ")}
          </Button>
        </Col>
        <Col>
          <Input
            type="number"
            step="1"
            min="0"
            placeholder="price"
            value={combination.price}
            onChange={e => editVariantPrice(i, e)}
          />
        </Col>
        <Col>
          {props.match.params.product_id !== "new" && (
            <i className="icon-pencil" />
          )}
        </Col>
      </Row>
    ));

  const editVariantMarkup = combinations.length > 0 && (
    <>
      <Row>
        <Col>
          <strong>Variant</strong>
        </Col>
        <Col>
          <strong>Price</strong>
        </Col>
        <Col />
      </Row>
      {variantCombinationMarkup}
    </>
  );

  return (
    <div className="animated fadeIn">
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
                    />
                  </Col>
                </Row>
              </div>
            </FormGroup>
          </Form>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <Row
            className="justify-content-between"
            style={{ marginLeft: 5, marginRight: 5 }}
          >
            <strong>Variants</strong>
            <a href="#" onClick={() => setIsModalActive(true)}>
              Edit variant options
            </a>
          </Row>
        </CardHeader>

        <CardBody>
          <FormGroup>
            <div>
              {props.match.params.product_id === "new" && addVariantMarkup}
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
      {variants.length > 0 && (
        <EditVariantDialog
          active={isModalActive}
          setActive={setIsModalActive}
          variants={variants}
        />
      )}
    </div>
  );
};
