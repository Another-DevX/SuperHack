// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
import {Campaign} from "./Campaign.sol";
import {Account} from "./Account.sol";
import {Review} from "./Review.sol";

interface IRealizeIT {
   
   

    function createCampaign() external;
    function verifyPublicAddress(
        address signal,
        uint256 root,
        uint256 nullifierHash,
        uint256[8] calldata proof
    ) external;

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
