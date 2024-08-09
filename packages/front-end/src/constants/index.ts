import { createPublicClient, http } from "viem";
import { baseSepolia } from "viem/chains";
import RealiezeITContractAbi from "./RealizeIT.abi.json";
export const REALIZE_IT_CONTRACT_ADDRESS =
  "0xCC843e94851443Cc6020cB6cDBbc00A781A292F5";
export const REALIZE_IT_CONTRACT_ABI = RealiezeITContractAbi;

export const publicClient = createPublicClient({
  chain: baseSepolia,
  transport: http(),
});
