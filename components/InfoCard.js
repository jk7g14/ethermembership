import React, {Component} from 'react';
import { Card, Button, Form, Input, Message } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Membership from '../ethereum/membership';

class InfoCard extends Component {
  state = {
    id: '',
    amount: '',
    isManager: false,
    balance: ''
  };

  async componentDidMount() {
    const addr = require('../ethereum/address.json');
    const membership = Membership(addr.address); 
    const accounts = await web3.eth.getAccounts();
    const regi = await membership.methods.members(accounts[0]).call();
    const manager = await membership.methods.manager().call();
    const balance = await membership.methods.getBalance().call();
    //console.log(manager);
    //console.log(accounts[0]);
    this.setState({ id: regi['id'] });
    this.setState({ amount: web3.utils.fromWei(regi['amount'].toString(),'ether') });
    if (manager == accounts[0]) {
      this.setState({ isManager: true });
      this.setState({ balance: web3.utils.fromWei(balance.toString(),'ether')});
    } else {
      this.setState({ isManager: false });
    };
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
            {!this.state.isManager ? null : 
            (<h4>contract balance: {this.state.balance} ether</h4>)}
            <br />
            {!this.state.isManager ? null : 
            (
            <Button fluid 
              basic color="red" 
              disabled={true}>
              Collect!
            </Button>
            )}
          </Card.Description>
        </Card.Content>
      </Card>
    );
  }
}
export default InfoCard;
