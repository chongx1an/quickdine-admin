import React, { Component } from 'react';
import { Badge, Card, CardBody, CardFooter, CardHeader, Col, Row, Collapse, Fade } from 'reactstrap';
import { AppSwitch } from '@coreui/react'

class Products extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300
    };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState }});
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="6" md="1" />
          <Col xs="12" sm="6" md="2">
            <Card>
              <CardBody style={{height: '20vh', padding: 0}}>
                <div style={{height: 'inherit', width: 'inherit', backgroundSize: 'cover', backgroundImage: "url('data:image/jpeg;base64,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')"}}>
                </div>
              </CardBody>
              <CardFooter style={{textAlign: 'center'}}>Mc Chicken</CardFooter>
            </Card>
          </Col>
          <Col xs="12" sm="6" md="2">
            <Card>
              <CardBody style={{height: '20vh', padding: 0}}>
                <div style={{height: 'inherit', width: 'inherit', backgroundImage: "url('https://static01.nyt.com/images/2019/07/24/business/24recession/24recession-superJumbo.jpg')", backgroundSize: 'cover'}}>
                </div>
              </CardBody>
              <CardFooter style={{textAlign: 'center'}}>Mc Chicken</CardFooter>
            </Card>
          </Col>
          <Col xs="12" sm="6" md="2">
            <Card>
              <CardBody style={{height: '20vh', padding: 0}}>
                <div style={{height: 'inherit', width: 'inherit', backgroundImage: "url('https://static01.nyt.com/images/2019/07/24/business/24recession/24recession-superJumbo.jpg')", backgroundSize: 'cover'}}>
                </div>
              </CardBody>
              <CardFooter style={{textAlign: 'center'}}>Mc Chicken</CardFooter>
            </Card>
          </Col>
          <Col xs="12" sm="6" md="2">
            <Card>
              <CardBody style={{height: '20vh', padding: 0}}>
                <div style={{height: 'inherit', width: 'inherit', backgroundImage: "url('https://static01.nyt.com/images/2019/07/24/business/24recession/24recession-superJumbo.jpg')", backgroundSize: 'cover'}}>
                </div>
              </CardBody>
              <CardFooter style={{textAlign: 'center'}}>Mc Chicken</CardFooter>
            </Card>
          </Col>
          <Col xs="12" sm="6" md="2">
            <Card>
              <CardBody style={{height: '20vh', padding: 0}}>
                <div style={{height: 'inherit', width: 'inherit', backgroundImage: "url('https://static01.nyt.com/images/2019/07/24/business/24recession/24recession-superJumbo.jpg')", backgroundSize: 'cover'}}>
                </div>
              </CardBody>
              <CardFooter style={{textAlign: 'center'}}>Mc Chicken</CardFooter>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xs="12" sm="6" md="4">
            <Card className="border-primary">
              <CardHeader>
                Card outline primary
              </CardHeader>
              <CardBody>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
                ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" sm="6" md="4">
            <Card className="border-secondary">
              <CardHeader>
                Card outline secondary
              </CardHeader>
              <CardBody>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
                ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" sm="6" md="4">
            <Card className="border-success">
              <CardHeader>
                Card outline success
              </CardHeader>
              <CardBody>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
                ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" sm="6" md="4">
            <Card className="border-info">
              <CardHeader>
                Card outline info
              </CardHeader>
              <CardBody>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
                ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" sm="6" md="4">
            <Card className="border-warning">
              <CardHeader>
                Card outline warning
              </CardHeader>
              <CardBody>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
                ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" sm="6" md="4">
            <Card className="border-danger">
              <CardHeader>
                Card outline danger
              </CardHeader>
              <CardBody>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
                ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col xs="12" sm="6" md="4">
            <Card className="card-accent-primary">
              <CardHeader>
                Card with accent
              </CardHeader>
              <CardBody>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
                ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" sm="6" md="4">
            <Card className="card-accent-secondary">
              <CardHeader>
                Card with accent
              </CardHeader>
              <CardBody>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
                ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" sm="6" md="4">
            <Card className="card-accent-success">
              <CardHeader>
                Card with accent
              </CardHeader>
              <CardBody>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
                ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" sm="6" md="4">
            <Card className="card-accent-info">
              <CardHeader>
                Card with accent
              </CardHeader>
              <CardBody>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
                ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" sm="6" md="4">
            <Card className="card-accent-warning">
              <CardHeader>
                Card with accent
              </CardHeader>
              <CardBody>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
                ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" sm="6" md="4">
            <Card className="card-accent-danger">
              <CardHeader>
                Card with accent
              </CardHeader>
              <CardBody>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
                ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xs="12" sm="6" md="4">
            <Card className="text-white bg-primary text-center">
              <CardBody>
                <blockquote className="card-bodyquote">
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
                  <footer>Someone famous in <cite title="Source Title">Source Title</cite></footer>
                </blockquote>
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" sm="6" md="4">
            <Card className="text-white bg-success text-center">
              <CardBody>
                <blockquote className="card-bodyquote">
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
                  <footer>Someone famous in <cite title="Source Title">Source Title</cite></footer>
                </blockquote>
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" sm="6" md="4">
            <Card className="text-white bg-info text-center">
              <CardBody>
                <blockquote className="card-bodyquote">
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
                  <footer>Someone famous in <cite title="Source Title">Source Title</cite></footer>
                </blockquote>
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" sm="6" md="4">
            <Card className="text-white bg-warning text-center">
              <CardBody>
                <blockquote className="card-bodyquote">
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
                  <footer>Someone famous in <cite title="Source Title">Source Title</cite></footer>
                </blockquote>
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" sm="6" md="4">
            <Card className="text-white bg-danger text-center">
              <CardBody>
                <blockquote className="card-bodyquote">
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
                  <footer>Someone famous in <cite title="Source Title">Source Title</cite></footer>
                </blockquote>
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" sm="6" md="4">
            <Card className="text-white bg-primary text-center">
              <CardBody>
                <blockquote className="card-bodyquote">
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
                  <footer>Someone famous in <cite title="Source Title">Source Title</cite></footer>
                </blockquote>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xs="12" sm="6" md="4">
            <Card className="text-white bg-primary">
              <CardHeader>
                Card title
              </CardHeader>
              <CardBody>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
                ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" sm="6" md="4">
            <Card className="text-white bg-success">
              <CardHeader>
                Card title
              </CardHeader>
              <CardBody>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
                ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" sm="6" md="4">
            <Card className="text-white bg-info">
              <CardHeader>
                Card title
              </CardHeader>
              <CardBody>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
                ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" sm="6" md="4">
            <Card className="text-white bg-warning">
              <CardHeader>
                Card title
              </CardHeader>
              <CardBody>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
                ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" sm="6" md="4">
            <Card className="text-white bg-danger">
              <CardHeader>
                Card title
              </CardHeader>
              <CardBody>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
                ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" sm="6" md="4">
            <Fade timeout={this.state.timeout} in={this.state.fadeIn}>
              <Card>
                <CardHeader>
                  Card actions
                  <div className="card-header-actions">
                    {/*eslint-disable-next-line*/}
                    <a href="#" className="card-header-action btn btn-setting"><i className="icon-settings"></i></a>
                    {/*eslint-disable-next-line*/}
                    <a className="card-header-action btn btn-minimize" data-target="#collapseExample" onClick={this.toggle}><i className="icon-arrow-up"></i></a>
                    {/*eslint-disable-next-line*/}
                    <a className="card-header-action btn btn-close" onClick={this.toggleFade}><i className="icon-close"></i></a>
                  </div>
                </CardHeader>
                <Collapse isOpen={this.state.collapse} id="collapseExample">
                  <CardBody>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                    laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
                    ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
                  </CardBody>
                </Collapse>
              </Card>
            </Fade>
          </Col>

        </Row>
      </div>
    );
  }
}

export default Products;
