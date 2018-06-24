import React, {Component} from 'react';
import {Container, Header, Card, Button, Table} from 'semantic-ui-react';
import Membership from '../../ethereum/membership';
import web3 from '../../ethereum/web3';
import Layout from '../../components/Layout';
import MainCards from '../../components/MainCards';
import RequestRow from '../../components/RequestRow';

class MembershipIndex extends Component {
  static async getInitialProps(props) {
    const id = props.query.id;
    const address = props.query.address;
    const membership = Membership(address);
    const manager = await membership.methods.manager().call();
    const urlName = await membership.methods.url().call();
    const transectionCount = await membership.methods
      .getTransectionsCount()
      .call();
    const transections = await Promise.all(
      Array(parseInt(transectionCount))
        .fill()
        .map((element, index) => {
          return membership.methods.transections(index).call();
        })
    );

    return {manager, transections, address, urlName, id};
  }

  renderRows() {
    return this.props.transections.map((transection, index) => {
      return <RequestRow key={index} id={index} transection={transection} />;
    });
  }

  render() {
    const {Header, Row, HeaderCell, Body} = Table;
    return (
      <Layout>
        <Container text>
          <Header as="h1" dividing="true">
            {this.props.urlName}
          </Header>
          <Header as="h3">manager: {this.props.manager}</Header>
          <MainCards address={this.props.address} id={this.props.id}/>
          <Table>
            <Header>
              <Row>
                <HeaderCell>Index</HeaderCell>
                <HeaderCell>Date</HeaderCell>
                <HeaderCell>From</HeaderCell>
                <HeaderCell>Amount</HeaderCell>
              </Row>
            </Header>
            <Body>{this.renderRows()}</Body>
          </Table>
        </Container>
      </Layout>
    );
  }
}

export default MembershipIndex;
