// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
import {IRealizeIT} from "./interfaces/IRealizeIT.sol";
import {IWorldID} from "./interfaces/IWorldID.sol";
import {ByteHasher} from "./helpers/ByteHasher.sol";

contract RealizeIT is IRealizeIT {
    mapping(address => Account) users;
    mapping(uint256 => Campaign) campaigns;

    /// @dev This allows us to use our hashToField function on bytes
    using ByteHasher for bytes;

    /// @notice Thrown when attempting to reuse a nullifier
    error InvalidNullifier();

    /// @dev The address of the World ID Router contract that will be used for verifying proofs
    IWorldID internal immutable worldId;

    /// @dev The keccak256 hash of the externalNullifier (unique identifier of the action performed), combination of appId and action
    uint256 internal immutable externalNullifierHash;

    /// @dev The World ID group ID (1 for Orb-verified)
    uint256 internal immutable groupId = 1;

    /// @dev Whether a nullifier hash has been used already. Used to guarantee an action is only performed once by a single person
    mapping(uint256 => bool) internal nullifierHashes;

    /// @param _worldId The address of the WorldIDRouter that will verify the proofs
    /// @param _appId The World ID App ID (from Developer Portal)
    /// @param _action The World ID Action (from Developer Portal)
    constructor(
        IWorldID _worldId,
        string memory _appId,
        string memory _action
    ) {
        worldId = _worldId;
        externalNullifierHash = abi
            .encodePacked(abi.encodePacked(_appId).hashToField(), _action)
            .hashToField();
    }

    function createHypercerts() public {
        // TODO: Implement createHypercerts
        // Create a new Hypercerts per each campaign and point the campaign to the hypercertID
    }

    function verifyPublicAddress(
        address signal,
        uint256 root,
        uint256 nullifierHash,
        uint256[8] calldata proof
    ) public {
        Account storage account = users[signal];
        require(
            account.isVerifiedWithWorldCoin,
            "The account is not verified with WorldCoin"
        );
        if (nullifierHashes[nullifierHash]) revert InvalidNullifier();

        worldId.verifyProof(
            root,
            groupId, // set to "1" in the constructor
            abi.encodePacked(signal).hashToField(),
            nullifierHash,
            externalNullifierHash,
            proof
        );
        account.isVerifiedWithWorldCoin = true;
        nullifierHashes[nullifierHash] = true;
    }

    function signIn(address user, uint256 hypercertID) public {
        Campaign storage campaign = campaigns[hypercertID];
        require(
            campaign.currentQuota < campaign.maxQuota,
            "The campaign is full"
        );
        require(!campaign.attenders[user], "The user is currently signed in");
        campaign.currentQuota += 1;
        campaign.attenders[user] = true;
    }

    function signOut(address user, uint256 hypercertID) public {
        Campaign storage campaign = campaigns[hypercertID];
        require(campaign.attenders[user], "The user is not signed in");
        campaign.currentQuota -= 1;
        campaign.attenders[user] = false;
    }

    function checkOut(
        address user,
        uint256 hypercertID,
        uint16 hostRate
    ) public {
        Campaign storage campaign = campaigns[hypercertID];
        require(campaign.attenders[user], "The user is not signed in");
        require(
            hostRate <= 5 && hostRate >= 0,
            "The host rate should be between 0 and 5"
        );
        uint256 price = campaign.pricePool /
            (campaign.currentQuota - campaign.checkouts);
        users[user].points += price;
        campaign.pricePool -= price;
        campaign.checkouts += 1;
        campaign.attenders[user] = false;
        _calculateAverageStars(campaign.host, hostRate);
    }

    function submitHostReview(
        uint256 hypercertID,
        Review[] memory reviews
    ) public {
        Campaign storage campaign = campaigns[hypercertID];
        require(
            campaign.checkouts == campaign.currentQuota,
            "The campaign is not finished yet"
        );
        require(reviews.length == campaign.currentQuota, "Invalid reviews");
        for (uint i = 0; i < reviews.length; i++) {
            require(
                campaign.attenders[reviews[i].user],
                "The user is not signed in"
            );
            require(
                reviews[i].stars <= 5 && reviews[i].stars >= 0,
                "The rate should be between 0 and 5"
            );
            _calculateAverageStars(reviews[i].user, reviews[i].stars);
        }
    }

    function _calculateAverageStars(
        address user,
        uint16 newStars
    ) internal returns (uint16 avgStars) {
        Account storage account = users[user];
        account.stars += newStars;
        account.reviews += 1;
        avgStars = uint16(account.stars / account.reviews);
    }
}
