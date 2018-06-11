pragma solidity ^0.4.17;

contract Membership {
    struct Member {
        address addr;
        string id;
        uint amount;
        bool registered;
    }
    
    address public manager;
    uint public memberCount;
    mapping(address=>Member) public contributors;
    
    modifier restricted {
        require(msg.sender == manager);
        _;
    }

    constructor() public payable{
        manager = msg.sender;
    }
    
    function register(string id) public payable{
        require(!contributors[msg.sender].registered);
        Member memory newMember = Member({
            addr: msg.sender,
            id: id,
            amount: msg.value,
            registered: true
        });
        memberCount++;
        contributors[msg.sender] = newMember;
    }
    
    function contribute() public payable {
        require(contributors[msg.sender].registered);
        contributors[msg.sender].amount = contributors[msg.sender].amount + msg.value;
    }
    
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
    
    function collect() public restricted{
        address(manager).transfer(address(this).balance);
    }
}
