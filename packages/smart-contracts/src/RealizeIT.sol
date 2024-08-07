// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
import {IRealizeIT} from "./interfaces/IRealizeIT.sol";

contract RealizeIT is IRealizeIT {
    mapping(address => Account) users;
    mapping(uint256 => Campaign) campaigns;

    function createHypercerts() public {
        // TODO: Implement createHypercerts
        // Create a new Hypercerts per each campaign and point the campaign to the hypercertID
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
