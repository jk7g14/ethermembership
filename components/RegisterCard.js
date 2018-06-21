import React, {Component} from 'react';
import { Card, Button, Form, Input, Message } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Membership from '../ethereum/membership';
import { Router } from '../routes';

class RegisterCard extends Component {
  state = {
    id: '',
    value: '',
    errorMessage: '',
    loading: false
  };

  onSubmit = async (event) => {
    event.preventDefault();

    this.setState({ loading:true, errorMessage: '' });

    try{
      const membership = Membership(this.props.address);
      var today = new Date();
      var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
      const accounts = await web3.eth.getAccounts();
      //      console.log(accounts[0]);
      //      console.log(date);
      //      console.log(membership.manager().call());
      await membership.methods
        .register(this.state.id, date)
        .send({
          from: accounts[0],
          value: web3.utils.toWei(this.state.value, 'ether')
        });

      Router.pushRoute(`/memberships/${this.props.address}`);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({id:'', value: '', loading: false})
  };
  render() {
    return (
      <Card>
        <Card.Content>
          <Card.Header>Register</Card.Header>
          <Card.Meta>
            Fill out this form with your email and the amount of ether to
            contribute
          </Card.Meta>
          <Card.Description>
            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
              <Form.Field>
                <label>id</label>
                <Input
                  value={this.state.id}
                  onChange={event => this.setState({id: event.target.value})}
                />
              </Form.Field>
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
                disabled={!(this.state.id && this.state.value)}>
                Contribute!
              </Button>
            </Form>
          </Card.Description>
        </Card.Content>
      </Card>
    );
  }
}
export default RegisterCard;
