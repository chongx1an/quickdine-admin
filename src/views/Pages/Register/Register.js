import React, { Component } from 'react';
import Cookies from 'js-cookie';
import ApiClient from '../../../ApiClient';
import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { Link } from 'react-router-dom';

class Register extends Component {

  constructor(props) {

    super(props);

    this.register = this.register.bind(this);
    this.handleMatchPassword = this.handleMatchPassword.bind(this);

    this.state = {
      storeName: "",
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
      isPasswordMatched: null,
    }

  }

  register() {

    var body = {
      store_name: this.state.storeName,
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
    };

    ApiClient.post('/auth/register', body)
      .then(res => {

        const { success, admin, token } = res;

        if (success) {

          // store token in cookie and go to home screen
          Cookies.set("token", token, { expires: 365 });
          Cookies.set("admin", admin, { expires: 365 });
          window.location.href = "/stores";

        } else {

          // TODO: show error

        }

      })
      .catch(console.log);

  }

  handleMatchPassword(e) {

    if (e.target.name === "password") {

      this.setState({ isPasswordMatched: e.target.value === this.state.confirmPassword })
      this.setState({ password: e.target.value });

    } else {

      this.setState({ isPasswordMatched: e.target.value === this.state.password })
      this.setState({ confirmPassword: e.target.value });

    }

  }

  handleClassName() {

    if (this.state.isPasswordMatched == null) {

      return "form-control";

    } else if (this.state.isPasswordMatched) {

      return "form-control is-valid";

    }

    return "form-control is-invalid";

  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">

                  <Form onSubmit={this.register} className="needs-validation" action="javascript:void(0)" novalidate>
                    <h1>Register</h1>
                    <p className="text-muted">Create your account</p>

                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-home"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        required
                        className="form-control"
                        value={this.state.storeName}
                        onChange={(e) => this.setState({ storeName: e.target.value })}
                        type="text"
                        placeholder="Store name"
                      />
                    </InputGroup>

                    <Row>
                      <Col>
                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-user"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            required
                            className="form-control"
                            value={this.state.firstName}
                            onChange={(e) => this.setState({ firstName: e.target.value })}
                            type="text"
                            placeholder="First name"
                          />
                        </InputGroup>
                      </Col>
                      <Col>
                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-user"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            required
                            className="form-control"
                            value={this.state.lastName}
                            onChange={(e) => this.setState({ lastName: e.target.value })}
                            type="text"
                            placeholder="Last name"
                          />
                        </InputGroup>
                      </Col>
                    </Row>

                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input
                        required
                        className="form-control"
                        value={this.state.email}
                        onChange={(e) => this.setState({ email: e.target.value })}
                        type="text"
                        placeholder="Email"
                      />
                    </InputGroup>

                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        required
                        name="password"
                        className="form-control"
                        value={this.state.password}
                        onChange={this.handleMatchPassword}
                        type="password"
                        placeholder="Password"
                      />
                    </InputGroup>

                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        required
                        name="confirm-password"
                        className={this.handleClassName()}
                        value={this.state.confirmPassword}
                        onChange={this.handleMatchPassword}
                        type="password"
                        placeholder="Confirm password"
                      />
                    </InputGroup>

                    <Button color="success" type="submit" block>Create Account</Button>
                    <div style={{ height: "1vh" }}></div>
                    <Link to="/login">
                      <Button color="primary" block>Back to login</Button>
                    </Link>
                  </Form>
                </CardBody>

                {/* <CardFooter className="p-4">
                  <Row>
                    <Col xs="12" sm="6">
                      <Button className="btn-facebook mb-1" block><span>facebook</span></Button>
                    </Col>
                    <Col xs="12" sm="6">
                      <Button className="btn-twitter mb-1" block><span>twitter</span></Button>
                    </Col>
                  </Row>
                </CardFooter> */}
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Register;
