import React, {Component} from 'react';
import { Card, Button, Form, Input, Message } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Membership from '../ethereum/membership';

class InfoCard extends Component {
  state = {
    id: '',
    amount: '',
  };

  async componentDidMount() {
    const addr = require('../ethereum/address.json');
    const membership = Membership(addr.address); 
    const accounts = await web3.eth.getAccounts();
    const regi = await membership.methods.members(accounts[0]).call();
    this.setState({ id: regi['id'] });
    this.setState({ amount: web3.utils.fromWei(regi['amount'].toString(),'ether') });
  }

  render() {
    return (
      <Card>
        <Card.Content>
          <Card.Header>Information</Card.Header>
          <Card.Description>
            <div></div>
            <h4>id: {this.state.id}</h4>
            <h4>amount: {this.state.amount} ether</h4>
          </Card.Description>
        </Card.Content>
      </Card>
    );
  }
}
export default InfoCard;
