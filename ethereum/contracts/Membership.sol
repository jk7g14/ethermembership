pragma solidity ^0.4.17;

contract MembershipFactory {
    address[] public deployedMemberships;
    mapping(address=>address) public membershipAddresses;
    
    function createMembership(string url) public{
        address newMembership = new Membership(url, msg.sender);
        deployedMemberships.push(newMembership);
        membershipAddresses[msg.sender] = newMembership;
    }
    
    function getDeployedMemberships() public view returns (address[]) {
        return deployedMemberships;
    }
}

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

    string public url;
    address public manager;
    uint public memberCount;
    
    address[] private memberList;
    Transection[] public transections;
    
    mapping(address=>Member) public members;
    
    modifier restricted {
        require(msg.sender == manager);
        _;
    }

    constructor(string defualt_url, address creator) public {
        manager = creator;
        url = defualt_url;
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
        memberList.push(msg.sender);
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
    
    function getMemberInfo(uint index) public view restricted returns (address, string, uint) {
        Member memory member = members[address(memberList[index])];
        return (memberList[index],member.id,member.amount);
    }
}
