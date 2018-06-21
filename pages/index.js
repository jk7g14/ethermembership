import React, {Component} from 'react';
import {Card, Button} from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Layout from '../components/Layout';
import {Link} from '../routes';

class CampaignIndex extends Component {
  static async getInitialProps() {
    const memberships = await factory.methods.getDeployedMemberships().call();

    return {memberships};
  }

  renderMemberships() {
    const items = this.props.memberships.map(address => {
      return {
        header: address,
        description: (
          <Link route={`/memberships/${address}`}>
            <a>View Membership</a>
          </Link>
        ),
        fluid: true,
      };
    });

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <div>
          <h3>Open Memberships</h3>
          <Link route="/memberships/new">
            <a>
            <Button size="massive" fluid content="Create Membership" icon="add circle" primary />
            </a>
          </Link>
          <br />
          <br />
          {this.renderMemberships()}
        </div>
      </Layout>
    );
  }
}

export default CampaignIndex;
