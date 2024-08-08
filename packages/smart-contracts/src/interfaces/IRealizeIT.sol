// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

interface IRealizeIT {
    struct Account {
        uint16 stars;
        uint256 points;
        string username;
        bool isVerifiedWithWorldCoin;
        string metadataURI;
        uint32 reviews;
    }

    struct Campaign {
        address host;
        uint16 maxQuota;
        uint16 currentQuota;
        uint256 pricePool;
        uint256 checkouts;
        mapping(address => bool) attenders;
    }

    struct Review {
        uint16 stars;
        address user;
    }

    function signUp(address user, uint256 hypercertID) external;
    function signOut(address user, uint256 hypercertID) external;
    function checkOut(
        address user,
        uint256 hypercertID,
        uint16 hostRate
    ) external;
    function submitHostReview(
        uint256 hypercertID,
        Review[] memory reviews
    ) external;
}
