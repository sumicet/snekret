// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract Article is ERC1155 {
    string private ipfsHash;
    bytes32 private privateKey;
    address private owner;
    bool public isPublic;
    mapping(address => bool) private whitelist;

    constructor(
        string memory _ipfsHash,
        bytes32 _privateKey,
        address _owner,
        bool _isPublic
    ) ERC1155("") {
        require(bytes(_ipfsHash).length > 0, "ipfsHash should not be empty");
        require(_privateKey != bytes32(0), "privateKey should not be empty");
        require(_owner != address(0), "owner should not be empty");

        ipfsHash = _ipfsHash;
        privateKey = _privateKey;
        owner = _owner;
        whitelist[owner] = true;
        isPublic = _isPublic;
        _mint(owner, 1, 1, "");
    }

    function addToWhitelist(address _address) public {
        require(msg.sender == owner, "Only owner can whitelist");
        require(_address != address(0), "address should not be empty");
        whitelist[_address] = true;
    }

    function removeFromWhitelist(address _address) public {
        require(msg.sender == owner, "Only owner can whitelist");
        require(_address != address(0), "address should not be empty");
        whitelist[_address] = false;
    }

    function getMetadata() public view returns (string memory, bytes32) {
        if (!isPublic) {
            require(whitelist[msg.sender], "Address not whitelisted");
        }
        return (ipfsHash, privateKey);
    }

    function updateMetadata(
        string memory _ipfsHash,
        bytes32 _privateKey
    ) public {
        require(msg.sender == owner, "Only owner can update article");
        require(bytes(_ipfsHash).length > 0, "ipfsHash should not be empty");
        require(_privateKey != bytes32(0), "privateKey should not be empty");
        ipfsHash = _ipfsHash;
        privateKey = _privateKey;
    }
}
