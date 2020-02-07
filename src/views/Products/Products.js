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
                <Badge color="danger" style={{position: 'absolute', top: 10, right: 10,}}>Hot Item</Badge>
                <div style={{height: 'inherit', width: 'inherit', backgroundSize: 'cover', backgroundImage: "url('https://1k9ch93e3xh2t4pa12vvmx1t-wpengine.netdna-ssl.com/wp-content/uploads/2017/09/Vegan-sushi-donuts_4483.jpg')"}}>
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
      </div>
    );
  }
}

export default Products;
