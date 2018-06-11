import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  //  '0xB078d9884208bb378833c51B659E3848b0eA8311'
  '0x5132e285E9167B5113bE1c653e61003887c93Db9'
);

export default instance;
