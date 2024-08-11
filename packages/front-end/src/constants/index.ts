import { createPublicClient, erc20Abi, http } from "viem";
import { baseSepolia } from "viem/chains";
import RealiezeITContractAbi from "./RealizeIT.abi.json";
export const REALIZE_IT_CONTRACT_ADDRESS =
  "0x4547A891f6D1e31B67A7FD530Bd8dCD1d97bB0ac";
export const REALIZE_IT_CONTRACT_ABI = RealiezeITContractAbi;
export const TOKEN_CONTRACT_ADDRESS =
  "0xA92E03E4bd369997C8B030dAE854d57b39212E5C";
export const publicClient = createPublicClient({
  chain: baseSepolia,
  transport: http(),
});
