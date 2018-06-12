pragma solidity ^0.4.17;

contract Membership {
    struct Member {
        string id;
        uint amount;
        bool registered;
    }
    struct Transection {
        string date;
        address addr;
        uint amount;
    }
    
    address public manager;
    uint public memberCount;
    mapping(address=>Member) public members;
    Transection[] public transections;
    
    modifier restricted {
        require(msg.sender == manager);
        _;
    }

    constructor() public payable{
        manager = msg.sender;
    }
    
    function register(string id, string date) public payable{
        require(!members[msg.sender].registered);
        Member memory newMember = Member({
            id: id,
            amount: msg.value,
            registered: true
        });
        
        Transection memory newTransection = Transection({
            date: date,
            addr: msg.sender,
            amount: msg.value
        });
        transections.push(newTransection);
        memberCount++;
        members[msg.sender] = newMember;
    }
    
    function contribute(string date) public payable {
        require(members[msg.sender].registered);
        members[msg.sender].amount = members[msg.sender].amount + msg.value;
        
        Transection memory newTransection = Transection({
            date: date,
            addr: msg.sender,
            amount: msg.value
        });
        transections.push(newTransection);
    }
    
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
    
    function collect() public restricted{
        address(manager).transfer(address(this).balance);
    }
    
    function getTransectionsCount() public view returns (uint) {
        return transections.length;
    }
}
