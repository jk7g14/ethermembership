import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import RegisterCard from './RegisterCard';
import ContributeCard from './ContributeCard';

class MainCards extends Component {
  render() {
    return (
      <Card.Group>
        <RegisterCard />
        <ContributeCard />
      </Card.Group>

    );

  }
}

export default MainCards;
