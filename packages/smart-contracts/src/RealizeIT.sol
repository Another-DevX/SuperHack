// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
import "./interfaces/IRealizeIT.sol";
import {IWorldID} from "./interfaces/IWorldID.sol";
import {ByteHasher} from "./helpers/ByteHasher.sol";
import {IERC1155Receiver} from "@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol";
import {IHypercertToken} from "../src/interfaces/IHypercertToken.sol";
import {Points} from "../src/Points.sol";


import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
contract RealizeIT is IRealizeIT, IERC1155Receiver {
    struct TempCampaign {
        address creator;
        uint256 prizePool;
        bool onlyVerified;
        string uri;
    }

    event CampaignCreated(address host, uint256 pricePool, uint256 maxQuota ,uint256 currentQuota ,uint256 checkouts , bool onlyVerified);
    event SingedUp(address user, uint256 hypercertID);
    event SingedOut(address user, uint256 hypercertID);
    event CheckOut( address user, uint256 hypercertID, uint16 hostRate);
   
    event HostReviewed(uint256 hypercertID, uint16[] stars, address user);

    TempCampaign private tempCampaign;

    /// @dev The Hypercerts contract that will be used to mint Hypercerts
    IHypercertToken hypercerts;
    Points points;
    IERC20 USDC;

    mapping(address => Account) public users;
    mapping(uint256 => Campaign) public campaigns;

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
        string memory _action,
        IHypercertToken _hypercerts,
        Points _points,
        IERC20 _USDC
    ) {
        worldId = _worldId;
        externalNullifierHash = abi
            .encodePacked(abi.encodePacked(_appId).hashToField(), _action)
            .hashToField();
        hypercerts = _hypercerts;
        points = _points;
        USDC = _USDC;
    }

    function createCampaign(
        string memory uri,
        uint256 prizePool,
        bool onlyVerifiedAccounts
    ) public {
        tempCampaign = TempCampaign({
            creator: msg.sender,
            prizePool: prizePool,
            onlyVerified: onlyVerifiedAccounts,
            uri: uri
        });

        hypercerts.mintClaim(
            address(this),
            100,
            uri,
            IHypercertToken.TransferRestrictions.AllowAll
        );
    }

    function verifyPublicAddress(
        address signal,
        uint256 root,
        uint256 nullifierHash,
        uint256[8] calldata proof
    ) public {
        Account storage account = users[signal];
        require(
            !account.isVerifiedWithWorldCoin,
            "The account is verified with WorldCoin"
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

    function signUp(address user, uint256 hypercertID) public {
        Campaign storage campaign = campaigns[hypercertID];
        require(
            campaign.currentQuota < campaign.maxQuota,
            "The campaign is full"
        );
        if (campaign.onlyVerified) {
            require(
                users[user].isVerifiedWithWorldCoin,
                "The user is not verified with WorldCoin"
            );
        }
        require(!campaign.attenders[user], "The user is currently signed in");
        campaign.currentQuota += 1;
        campaign.attenders[user] = true;

        emit SingedUp(user,hypercertID);
    }

    function signOut(address user, uint256 hypercertID) public {
        Campaign storage campaign = campaigns[hypercertID];
        require(campaign.attenders[user], "The user is not signed in");
        campaign.currentQuota -= 1;
        campaign.attenders[user] = false;
        emit SingedOut(user,hypercertID);
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
        uint256 prize = campaign.pricePool /
            (campaign.currentQuota - campaign.checkouts);
        campaign.pricePool -= prize;
        campaign.checkouts += 1;
        campaign.attenders[user] = false;
        _calculateAverageStars(campaign.host, hostRate);
        USDC.transfer(user, prize);
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
            if (reviews[i].stars >= 3) {
                if (reviews[i].stars == 5) {
                    points.mint(reviews[i].user, 25);
                }
                if (reviews[i].stars == 4) {
                    points.mint(reviews[i].user, 10);
                } else {
                    points.mint(reviews[i].user, 5);
                }
            }
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

    function onERC1155Received(
        address /* operator */,
        address /* from */,
        uint256 id,
        uint256 /* value */,
        bytes calldata /* data */
    ) external override returns (bytes4) {
        // Handle token reception
        Campaign storage campaign = campaigns[id];

        campaign.host = tempCampaign.creator;
        campaign.pricePool = tempCampaign.prizePool;
        campaign.maxQuota = 100; // O cualquier otro valor que desees
        campaign.currentQuota = 0;
        campaign.checkouts = 0;
        campaign.onlyVerified = tempCampaign.onlyVerified;
        delete tempCampaign;

        emit CampaignCreated(campaign.host,campaign.pricePool, campaign.maxQuota ,campaign.currentQuota ,campaign.checkouts = 0, campaign.onlyVerified);
        return this.onERC1155Received.selector;
    }

    function onERC1155BatchReceived(
        address /* operator */,
        address /* from */,
        uint256[] calldata /* ids */,
        uint256[] calldata /* values */,
        bytes calldata /* data */
    ) external override returns (bytes4) {
        // Handle batch token reception
        return this.onERC1155BatchReceived.selector;
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override returns (bool) {
        return interfaceId == type(IERC1155Receiver).interfaceId;
    }
}
