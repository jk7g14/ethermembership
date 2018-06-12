import web3 from './web3';
import Membership from './build/Membership.json';
import addr from './address.json'

const instance = new web3.eth.Contract(
  JSON.parse(Membership.interface),
  addr.address
);

export default instance;
