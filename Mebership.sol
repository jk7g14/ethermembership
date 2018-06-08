pragma solidity ^0.4.17;

contract Membership {
    address public manager;
    uint public memberCount;
    mapping(address=>uint) public contributors;
    
    modifier restricted {
        require(msg.sender == manager);
        _;
    }

    constructor() public payable{
        manager = msg.sender;
    }
    
    function setMessage(address newManager) public {
        manager = newManager;
    }
    
    function contribute() public payable {
        uint amount = contributors[msg.sender];
        if (amount == 0) {
            memberCount++;
        }
        contributors[msg.sender] = amount + msg.value;
    }
    
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
    
    function collect() public restricted{
        address(manager).transfer(address(this).balance);
    }
}
