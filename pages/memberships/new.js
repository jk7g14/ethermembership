import React, { Component } from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';
import axios from 'axios';

class CampaignNew extends Component {
  state = {
    url: '',
    errorMessage: '', 
    loading: false
  };

  onSubmit = async (event) => {
    event.preventDefault();

    this.setState({ loading: true, errorMessage: ''});

    try{
      const accounts = await web3.eth.getAccounts();
      const memberships = await factory.methods
        .createMembership(this.state.url)
        .send({
          from: accounts[0] 
        });
      const contractAddress = await factory.methods.membershipAddresses(accounts[0]).call();
      console.log(contractAddress);
      const cid = { 
        cid: contractAddress
      };
      axios.post(`${this.state.url}`, { cid })
      .then(res => {
        console.log(res);
        console.log(res.data);
      });
      Router.pushRoute('/');
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false });
  };

  render() {
    return (
      <Layout>
        <h3>Create a Membership</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>URL</label>
            <Input
              value={this.state.url}
              placeholder={"http://example.com"}
              onChange={event => 
                this.setState({ url: event.target.value })}
            />
          </Form.Field>
          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button disabled={!this.state.url} loading={this.state.loading} primary content="Create!" />
        </Form>
      </Layout>
    );
  }
}


export default CampaignNew;
