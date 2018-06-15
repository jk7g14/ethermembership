import web3 from './web3';
import Membership from './build/Membership.json';

export default address => {
  return new web3.eth.Contract(
    JSON.parse(Membership.interface),
    address
  );
};

