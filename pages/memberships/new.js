import React, { Component } from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';
import axios from 'axios';

class MembershipNew extends Component {
  static async getInitialProps(props) {
    const cmsUrl = props.query.cmsUrl;
    //console.log(cmsUrl);
    return {cmsUrl};
  }
  async componentDidMount() {
    this.setState({url: this.props.cmsUrl});
    //console.log(this.props.url);
  }

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
      const cid = contractAddress;
      axios.post(`${this.state.url}/new`, { cid })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
      //Router.pushRoute('/');
      //window.location.assign(`${this.state.url}`);
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
              placeholder={"http://example.com"}
              onChange={event => 
                this.setState({ url: event.target.value })}
              value={this.state.url || ''}
            />
          </Form.Field>
          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button disabled={!this.state.url} loading={this.state.loading} primary content="Create!" />
        </Form>
      </Layout>
    );
  }
}


export default MembershipNew;
