import React, {Component} from 'react';
import { Card, Button, Form, Input, Message } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Membership from '../ethereum/membership';

class ContributeCard extends Component {
  state = {
    value: '',
    errorMessage: '',
    loading: false
  };

  onSubmit = async (event) => {
    event.preventDefault();

    this.setState({ loading:true, errorMessage: '' });

    try{
      const addr = require('../ethereum/address.json');
      const membership = Membership(addr.address);
      var today = new Date();
      var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
      const accounts = await web3.eth.getAccounts();
      //      console.log(accounts[0]);
      //      console.log(date);
      //      console.log(membership.manager().call());
      await membership.methods
        .contribute(date)
        .send({
          from: accounts[0],
          value: web3.utils.toWei(this.state.value, 'ether')
        });

    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({value: '', loading: false})
  };
  render() {
    return (
      <Card>
        <Card.Content>
          <Card.Header>Contribute more!</Card.Header>
          <Card.Meta>
            Only registered users can contribute more!
          </Card.Meta>
          <Card.Description>
            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
              <Form.Field>
                <label>amount</label>
                <Input
                  value={this.state.value}
                  onChange={event => this.setState({value: event.target.value})}
                  label="ether"
                  labelPosition="right"
                />
              </Form.Field>
              <Message error header="Oops!" content={this.state.errorMessage}/>
              <Button fluid 
                basic color="green" 
                loading={this.state.loading}
                disabled={!this.state.value}>
                Contribute!
              </Button>
            </Form>
          </Card.Description>
        </Card.Content>
      </Card>
    );
  }
}
export default ContributeCard;
