// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

import "./Article.sol";

contract Storage {
    mapping(address => address[]) public ownerToArticles;

    function createArticle(
        string memory ipfsHash,
        bytes32 privateKey,
        address owner,
        bool isPublic
    ) public returns (address) {
        Article article = new Article(ipfsHash, privateKey, owner, isPublic);
        ownerToArticles[owner].push(address(article));

        return address(article);
    }

    function getArticles(address owner) public view returns (address[] memory) {
        return ownerToArticles[owner];
    }
}
