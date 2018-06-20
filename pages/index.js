import React, { Component } from 'react';
import { Card, Button, Table } from 'semantic-ui-react';
import Membership from '../ethereum/membership';
import web3 from '../ethereum/web3'
import Layout from '../components/Layout';
import MainCards from '../components/MainCards'
import RequestRow from '../components/RequestRow'

class MembershipIndex extends Component {
  static async getInitialProps() {
    const addr = require('../ethereum/address.json');
    const address = addr.address
    const membership = Membership(address);
    const manager = await membership.methods.manager().call();
    const transectionCount = await membership.methods.getTransectionsCount().call();
    const transections = await Promise.all(
      Array(parseInt(transectionCount))
      .fill()
      .map((element,index) => {
        return membership.methods.transections(index).call()
      })
    );

    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    return { manager, date, transections };
  }

  renderRows() {
    return this.props.transections.map((transection, index) => {
      return (<RequestRow
        key={index}
        id={index}
        transection={transection}
      />
      );
    });
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
              <HeaderCell>Index</HeaderCell>
              <HeaderCell>Date</HeaderCell>
              <HeaderCell>From</HeaderCell>
              <HeaderCell>Amount</HeaderCell>
            </Row>
          </Header>
          <Body>
            { this.renderRows() }
          </Body>
        </Table>
      </Layout>
    );
  }
}

export default MembershipIndex;
