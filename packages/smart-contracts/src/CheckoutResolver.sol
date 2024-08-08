// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
import {IRealizeIT} from "./interfaces/IRealizeIT.sol";
import {SchemaResolver} from "eas-contracts/resolver/SchemaResolver.sol";
import {IEAS, Attestation} from "eas-contracts/IEAS.sol";

contract CheckoutResolver is SchemaResolver {
    IRealizeIT public realizeIT;
    constructor(IEAS eas, IRealizeIT _realizeIt) SchemaResolver(eas) {
        realizeIT = _realizeIt;
    }

    function onAttest(
        Attestation calldata attestation,
        uint256 /*value*/
    ) internal override returns (bool) {
        (address user, uint256 hypercertID, uint16 hostRate) = abi.decode(
            attestation.data,
            (address, uint256, uint16)
        );
        try realizeIT.checkOut(user, hypercertID, hostRate) {
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
