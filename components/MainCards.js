import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
//import Web3 from 'web3'
import RegisterCard from './RegisterCard';
import ContributeCard from './ContributeCard';
import InfoCard from './InfoCard';
import Membership from '../ethereum/membership';

class MainCards extends Component {
  state = {
    registered: false
  };

  async componentDidMount() {
    const membership = Membership(this.props.address); 
    const accounts = await web3.eth.getAccounts();
    const regi = await membership.methods.members(accounts[0]).call();
    //console.log(regi['registered']);
    this.setState({ registered: regi['registered'] });
  }

  render() {
    return (
      <Card.Group>
        {this.state.registered ? (<InfoCard address={this.props.address}/>) : (<RegisterCard address={this.props.address}/>)}
        <ContributeCard address={this.props.address}/>
      </Card.Group>

    );

  }
}

export default MainCards;
