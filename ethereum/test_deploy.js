const fs = require('fs-extra');
const address = '0x5558E0bD2801b7Cb28d011d31462D6D8290EB101';
var obj = {'address': address}
fs.writeFile("address.json", JSON.stringify(obj), function(err) {
  if (err) throw err;
  console.log('address saved into address.json');
});
  
