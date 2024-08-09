import {
  publicClient,
  REALIZE_IT_CONTRACT_ABI,
  REALIZE_IT_CONTRACT_ADDRESS,
} from "@/constants";
import { useAccount } from "@account-kit/react";
import { useEffect, useState } from "react";

export const useIsVerified = () => {
  const [isVerified, setIsVerified] = useState(false);
  const { address } = useAccount({
    type: "LightAccount",
  });

  console.debug("Address:", address);

  useEffect(() => {
    if (!address) return;
    (async () => {
      try {
        const data = await publicClient.readContract({
          address: REALIZE_IT_CONTRACT_ADDRESS,
          abi: REALIZE_IT_CONTRACT_ABI,
          functionName: "users",
          args: [address],
        });
        console.debug(data);
        setIsVerified(true);
      } catch (error) {
        console.error("Error reading contract:", error);
        setIsVerified(false);
      }
    })();
  }),
    [address];

  return isVerified;
};
