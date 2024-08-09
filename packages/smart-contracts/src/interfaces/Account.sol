// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
struct Account {
    uint16 stars;
    uint256 points;
    string username;
    bool isVerifiedWithWorldCoin;
    string metadataURI;
    uint32 reviews;
}
