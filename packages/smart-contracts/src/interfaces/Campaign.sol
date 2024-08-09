// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
struct Campaign {
    address host;
    uint16 maxQuota;
    uint16 currentQuota;
    uint256 pricePool;
    uint256 checkouts;
    mapping(address => bool) attenders;
}
