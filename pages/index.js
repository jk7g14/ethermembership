import React, {Component} from 'react';
import {Card, Button} from 'semantic-ui-react';
import membership from '../ethereum/membership';
import web3 from '../ethereum/web3'

class MembershipIndex extends Component {
  static async getInitialProps() {
    const manager = await membership.methods.manager().call();
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    return {manager, date};
  }


  render() {
    return(
      <div>
        <h3>{this.props.date}</h3>
        <h3>{this.props.manager}</h3>
      </div>
    );
  }
}

export default MembershipIndex;
