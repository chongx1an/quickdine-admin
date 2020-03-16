import React, { useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Row,
  Col,
  Input
} from "reactstrap";

export default props => {
  const initialVariants = props.variants.map(variant => {
    variant.edited = false;
    variant.variant_options.map(option => {
      option.edited = false;
      return option;
    });
    return variant;
  });

  const [variants, setVariants] = useState(initialVariants);

  const addOption = (i, j) => {
    var variantsCopy = [...variants];

    variantsCopy[i].variant_options.push({ name: "" });

    setVariants(variantsCopy);
  };

  const editType = (i, name) => {
    var variantsCopy = [...variants];

    variantsCopy[i].type.name = name;
    variantsCopy[i].type.edited = true;

    setVariants(variantsCopy);
  };

  const editOption = (i, j, name) => {
    var variantsCopy = [...variants];

    variantsCopy[i].variant_options[j].name = name;
    variantsCopy[i].variant_options[j].edited = true;

    setVariants(variantsCopy);
  };

  const variantsMarkup =
    variants.length > 0 &&
    variants.map((variant, i) => (
      <Row key={i} style={{ marginBottom: 25 }}>
        <Col md={5}>
          <Input
            value={variant.type.name}
            onChange={e => editType(i, e.target.value)}
          />
        </Col>
        <Col md={6}>
          {variant.variant_options.map((option, j) => (
            <Row style={{ marginBottom: 10 }}>
              <Input
                value={option.name}
                onChange={e => editOption(i, j, e.target.value)}
              />
            </Row>
          ))}
          <Row style={{ marginBottom: 10 }}>
            <a href="#" onClick={() => addOption(i)}>
              Add more options
            </a>
          </Row>
        </Col>
      </Row>
    ));

  return (
    <Modal
      isOpen={props.active}
      toggle={() => props.setActive(!props.active)}
      className={"modal-lg"}
    >
      <ModalHeader toggle={() => props.setActive(!props.active)}>
        Edit variant options
      </ModalHeader>
      <ModalBody>{variantsMarkup}</ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={() => props.setActive(!props.active)}>
          Save
        </Button>{" "}
        <Button
          color="secondary"
          onClick={() => props.setActive(!props.active)}
        >
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};
