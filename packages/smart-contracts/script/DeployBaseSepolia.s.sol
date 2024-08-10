// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {IHypercertToken} from "../src/interfaces/IHypercertToken.sol";
import {Script, console} from "forge-std/Script.sol";
import {RealizeIT} from "../src/RealizeIT.sol";
import {NOTUSDC} from "../src/NOTUSDC.sol";
import {Points} from "../src/Points.sol";

import {RegistrationResolver} from "../src/RegistrationResolver.sol";
import {CheckoutResolver} from "../src/CheckoutResolver.sol";
import {HostReviewResolver} from "../src/HostReviewResolver.sol";

import {IWorldID} from "../src/interfaces/IWorldID.sol";
import {IEAS} from "eas-contracts/IEAS.sol";

contract DeployBaseSepolia is Script {
    function setUp() public {}

    function run() public {
        vm.startBroadcast();
        IEAS eas = IEAS(0x4200000000000000000000000000000000000021);

        NOTUSDC notusdc = new NOTUSDC();
        Points points = new Points(msg.sender);

        RealizeIT realizeIT = new RealizeIT(
            IWorldID(0x42FF98C4E85212a5D31358ACbFe76a621b50fC02),
            "app_staging_fa589b04290a1f98828f1ddc5e4b6394",
            "verify-public-address",
            IHypercertToken(0xC2d179166bc9dbB00A03686a5b17eCe2224c2704),
            points,
            notusdc
        );

        notusdc.mint(address(realizeIT) , 10000000000e18 );


        RegistrationResolver registrationResolver = new RegistrationResolver(
            eas,
            realizeIT
        );

        CheckoutResolver checkoutResolver = new CheckoutResolver(
            eas,
            realizeIT
        );

        HostReviewResolver hostReviewResolver = new HostReviewResolver(
            eas,
            realizeIT
        );

        console.log("realizeIT deployed at: ", address(realizeIT));
        console.log("NOTUSDC deployed at: ", address(notusdc));
        console.log(
            "registrationResolver deployed at: ",
            address(registrationResolver)
        );
        console.log("points deployed at: ", address(points));
        console.log(
            "checkoutResolver deployed at: ",
            address(checkoutResolver)
        );
        console.log(
            "HostReviewResolver deployed at: ",
            address(hostReviewResolver)
        );

        vm.stopBroadcast();
    }
}
//Clear cache in case of not workingness