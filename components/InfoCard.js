import React, {Component} from 'react';
import { Card, Button, Form, Input, Message } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Membership from '../ethereum/membership';
import axios from 'axios';

class InfoCard extends Component {
  state = {
    id: '',
    amount: '',
    isManager: false,
    balance: '',
    defaultUrl: ''
  };

  async componentDidMount() {
    //console.log(this.props.addess);
    const membership = Membership(this.props.address); 
    const accounts = await web3.eth.getAccounts();
    const regi = await membership.methods.members(accounts[0]).call();
    const manager = await membership.methods.manager().call();
    const balance = await membership.methods.getBalance().call();
    const defaultUrl = await membership.methods.url().call();
    this.setState({defaultUrl: defaultUrl});
    //console.log(this.state.defaultUrl);
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

  onClick = async () => {
    const membership = Membership(this.props.address); 
    const accounts = await web3.eth.getAccounts();
    await membership.methods
      .collect()
      .send({
        from: accounts[0],
      });

    const defaultUrl = await membership.methods.url().call();
    console.log(defaultUrl);

    const memberCount = await membership.methods
      .memberCount()
      .call();

    const members = await Promise.all(
      Array(parseInt(memberCount))
        .fill()
        .map((element, index) => {
          return membership.methods.getMemberInfo(index).call({
            from: accounts[0]
          })
        })
    );
    console.log(members);
    await axios.post(`https://jsonplaceholder.typicode.com/users`, { members })
      .then(res => {
        console.log(res);
        console.log(res.data);
      });
  };

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
              onClick={this.onClick}
              disabled={false}>
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