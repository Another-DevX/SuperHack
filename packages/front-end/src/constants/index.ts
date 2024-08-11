import { createPublicClient, erc20Abi, http } from "viem";
import { baseSepolia } from "viem/chains";
import RealiezeITContractAbi from "./RealizeIT.abi.json";
export const REALIZE_IT_CONTRACT_ADDRESS =
  "0x88ACdA903DC4F82B962f58A0e70211dFFE72FD09";
export const REALIZE_IT_CONTRACT_ABI = RealiezeITContractAbi;
export const TOKEN_CONTRACT_ADDRESS =
  "0xA92E03E4bd369997C8B030dAE854d57b39212E5C";
export const publicClient = createPublicClient({
  chain: baseSepolia,
  transport: http(),
});
