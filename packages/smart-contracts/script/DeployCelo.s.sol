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
        IEAS eas = IEAS(0x72E1d8ccf5299fb36fEfD8CC4394B8ef7e98Af92);

        NOTUSDC notusdc = new NOTUSDC();
        Points points = new Points(msg.sender);

        RealizeIT realizeIT = new RealizeIT(
            IHypercertToken(0x16bA53B74c234C870c61EFC04cD418B8f2865959),
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