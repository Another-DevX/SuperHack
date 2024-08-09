// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
import {IRealizeIT, Review} from "./interfaces/IRealizeIT.sol";
import {SchemaResolver} from "eas-contracts/resolver/SchemaResolver.sol";
import {IEAS, Attestation} from "eas-contracts/IEAS.sol";

contract HostReviewResolver is SchemaResolver {
    IRealizeIT public realizeIT;
    constructor(IEAS eas, IRealizeIT _realizeIt) SchemaResolver(eas) {
        realizeIT = _realizeIt;
    }

    function onAttest(
        Attestation calldata attestation,
        uint256 /*value*/
    ) internal override returns (bool) {
        (uint256 hypercertID, Review[] memory reviews) = abi.decode(
            attestation.data,
            (uint256, Review[])
        );
        try realizeIT.submitHostReview(hypercertID, reviews) {
            return true;
        } catch {
            return false;
        }
    }

    function onRevoke(
        Attestation calldata,
        /*attestation*/ uint256 /*value*/
    ) internal pure override returns (bool) {
        return false;
    }
}
