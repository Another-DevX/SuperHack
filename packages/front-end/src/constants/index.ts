import { createPublicClient, http } from "viem";
import { baseSepolia } from "viem/chains";
import RealiezeITContractAbi from "./RealizeIT.abi.json";
export const REALIZE_IT_CONTRACT_ADDRESS =
  "0x5fb6cd8da5Bd68F26A20627371f4e234CE4Ab8ED";
export const REALIZE_IT_CONTRACT_ABI = RealiezeITContractAbi;

export const publicClient = createPublicClient({
  chain: baseSepolia,
  transport: http(),
});
