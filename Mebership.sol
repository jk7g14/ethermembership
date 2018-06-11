pragma solidity ^0.4.17;

contract Membership {
    struct Member {
        string id;
        uint amount;
        bool registered;
    }
    
    address public manager;
    uint public memberCount;
    mapping(address=>Member) public members;
    
    modifier restricted {
        require(msg.sender == manager);
        _;
    }

    constructor() public payable{
        manager = msg.sender;
    }
    
    function register(string id) public payable{
        require(!members[msg.sender].registered);
        Member memory newMember = Member({
            id: id,
            amount: msg.value,
            registered: true
        });
        memberCount++;
        members[msg.sender] = newMember;
    }
    
    function contribute() public payable {
        require(members[msg.sender].registered);
        members[msg.sender].amount = members[msg.sender].amount + msg.value;
    }
    
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
    
    function collect() public restricted{
        address(manager).transfer(address(this).balance);
    }
}
