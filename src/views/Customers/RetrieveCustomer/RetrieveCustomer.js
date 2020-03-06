import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table, Button } from 'reactstrap';
import ApiClient from '../../../ApiClient';


class RetrieveCustomer extends Component {

  constructor(props) {

    super(props);

    this.retrieveCustomer = this.retrieveCustomer.bind(this);

    const { match: { params } } = this.props;

    this.state = {
      params: params,
      customer: {},
    };

  }

  componentDidMount() {

    this.retrieveCustomer();

  }

  retrieveCustomer() {

    ApiClient.get('@store/customers/' + this.state.params.customer_id)
      .then(res => {

        const { success, customer } = res;

        if (success) {

          this.setState({
            customer: customer,
          });

        } else {

          // TODO: show error

        }

      })
      .catch(console.log);

  }

  render() {
    return (
      <div className="animated fadeIn">
        <h1>HELLOOOOO</h1>
      </div>
    );
  }
}


export default RetrieveCustomer;
