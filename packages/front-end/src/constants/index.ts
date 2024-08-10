import { createPublicClient, erc20Abi, http } from "viem";
import { baseSepolia } from "viem/chains";
import RealiezeITContractAbi from "./RealizeIT.abi.json";
export const REALIZE_IT_CONTRACT_ADDRESS =
  "0xf4401497511738b7dafd7063c6162ac0d7cf5982";
export const REALIZE_IT_CONTRACT_ABI = RealiezeITContractAbi;
export const TOKEN_CONTRACT_ADDRESS = "0xA92E03E4bd369997C8B030dAE854d57b39212E5C"
export const publicClient = createPublicClient({
  chain: baseSepolia,
  transport: http(),
});
