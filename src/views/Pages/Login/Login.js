import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import ApiClient from '../../../ApiClient';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingButton from '../../Buttons/LoadingButton';

class Login extends Component {

  constructor(props) {

    super(props);

    this.login = this.login.bind(this);

    this.state = {
      email: "",
      password: "",
      isLoading: false,
    };

  }

  login() {

    this.setState({
      isLoading: true,
    });

    ApiClient.post('/admin/auth/login', this.state)
      .then(res => {

        const { success, admin, token, message } = res;

        if (success) {

          Cookies.set("token", token, { expires: 365 });
          Cookies.set("admin", admin, { expires: 365 });
          window.location.href = "/stores";

        } else {

          toast.error(message, {
            position: toast.POSITION.TOP_CENTER,
          });

          this.setState({
            isLoading: false,
          });

        }

      })
      .catch(console.log);

  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <ToastContainer />
                    <Form>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input onChange={(e) => this.setState({ email: e.target.value })} type="text" placeholder="Email" autoComplete="email" value={this.state.email} />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input onChange={(e) => this.setState({ password: e.target.value })} type="password" placeholder="Password" autoComplete="current-password" value={this.state.password} />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <LoadingButton
                            isLoading={this.state.isLoading}
                            text="Login"
                            onClick={this.login}
                          />
                        </Col>
                        <Col xs="6">
                          <Link to="/register">
                            <LoadingButton
                              isLoading={this.state.isLoading}
                              text="Register Now!"
                              color="secondary"
                            />
                            {/* <Button color="primary" className="mt-3" active tabIndex={-1}>Register Now!</Button> */}
                          </Link>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
