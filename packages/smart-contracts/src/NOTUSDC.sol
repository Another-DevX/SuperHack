// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NOTUSDC is ERC20 {
    // error NonTransferrable();
    constructor() ERC20("NOTUSDC", "USDC") {}

    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }
}
