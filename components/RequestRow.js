import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react';
import web3 from '../ethereum/web3';

class RequestRow extends Component {
  render() {
    const { Row, Cell } = Table;
    const { id, transection } = this.props;

    return (
      <Row>
        <Cell>{id}</Cell>
        <Cell>{transection.date}</Cell>
        <Cell>{transection.addr}</Cell>
        <Cell>{web3.utils.fromWei(transection.amount,'ether')}</Cell>
      </Row>

    );
  }
}

export default RequestRow;
