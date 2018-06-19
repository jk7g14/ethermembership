import React, { Component } from 'react';
import { Card, Button, Table } from 'semantic-ui-react';
import Membership from '../ethereum/membership';
import web3 from '../ethereum/web3'
import Layout from '../components/Layout';
import MainCards from '../components/MainCards'

class MembershipIndex extends Component {
  static async getInitialProps() {
    const addr = require('../ethereum/address.json');
    const membership = Membership(addr.address);
    const manager = await membership.methods.manager().call();
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    return {manager, date};
  }


  render() {
    const { Header, Row, HeaderCell, Body } = Table;
    return(
      <Layout>
        <div>
          <h3>{this.props.date}</h3>
          <h3>manager: {this.props.manager}</h3>
          <MainCards />
        </div>
        <Table>
          <Header>
            <Row>
              <HeaderCell>Date</HeaderCell>
              <HeaderCell>From</HeaderCell>
              <HeaderCell>Amount</HeaderCell>
            </Row>
          </Header>
          <Body>
          </Body>
        </Table>
      </Layout>
    );
  }
}

export default MembershipIndex;
