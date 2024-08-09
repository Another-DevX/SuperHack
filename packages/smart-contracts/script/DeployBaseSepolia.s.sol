// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {IHypercertToken} from "../src/interfaces/IHypercertToken.sol";
import {Script, console} from "forge-std/Script.sol";
import {RealizeIT} from "../src/RealizeIT.sol";
import {NOTUSDC} from "../src/NOTUSDC.sol";
import {RegistrationResolver} from "../src/RegistrationResolver.sol";
import {Points} from "../src/Points.sol";
import {CheckoutResolver} from "../src/CheckoutResolver.sol";
import {IWorldID} from "../src/interfaces/IWorldID.sol";
import {IEAS} from "eas-contracts/IEAS.sol";

contract DeployBaseSepolia is Script {
    function setUp() public {}

    function run() public {
        vm.startBroadcast();
        // IEAS eas = IEAS(0x4200000000000000000000000000000000000021);
        RealizeIT realizeIT = new RealizeIT(
            IWorldID(0x42FF98C4E85212a5D31358ACbFe76a621b50fC02),
            "app_staging_4989e6a8b385ae6116fb36aeae08c250",
            "realizeit",
            IHypercertToken(0xC2d179166bc9dbB00A03686a5b17eCe2224c2704)
        );
        // NOTUSDC notusdc = new NOTUSDC();
        // RegistrationResolver registrationResolver = new RegistrationResolver(
        //     eas,
        //     realizeIT
        // );
        // Points points = new Points(msg.sender);
        // CheckoutResolver checkoutResolver = new CheckoutResolver(
        //     eas,
        //     realizeIT
        // );
        //
        console.log("realizeIT deployed at: ", address(realizeIT));
        // console.log("NOTUSDC deployed at: ", address(notusdc));
        // console.log(
        //     "registrationResolver deployed at: ",
        //     address(registrationResolver)
        // );
        // console.log("points deployed at: ", address(points));
        // console.log(
        //     "checkoutResolver deployed at: ",
        //     address(checkoutResolver)
        // );

        vm.stopBroadcast();
    }
}
