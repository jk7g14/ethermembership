import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react';
import web3 from '../ethereum/web3';

class ContributeCard extends Component {
  render() {
    return (
      <Card>
        <Card.Content>
          <Card.Header>Steve Sanders</Card.Header>
          <Card.Meta>Friends of Elliot</Card.Meta>
          <Card.Description>
            Steve wants to add you to the group <strong>best friends</strong>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className='ui two buttons'>
            <Button basic color='green'>
              Approve
            </Button>
            <Button basic color='red'>
              Decline
            </Button>
          </div>
        </Card.Content>
      </Card>

    );
  }
}
export default ContributeCard;
