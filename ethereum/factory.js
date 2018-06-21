import web3 from './web3';
import MembershipFactory from './build/MembershipFactory.json'; 

const addr = require('./address.json');

const instance = new web3.eth.Contract(
  JSON.parse(MembershipFactory.interface),
  addr.address
);

export default instance;
