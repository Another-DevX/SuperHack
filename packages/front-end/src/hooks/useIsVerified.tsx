import {
  publicClient,
  REALIZE_IT_CONTRACT_ABI,
  REALIZE_IT_CONTRACT_ADDRESS,
} from "@/constants";
import { useUser } from "@account-kit/react";
import { useEffect, useState } from "react";

export const useIsVerified = () => {
  const [isVerified, setIsVerified] = useState(false);

  const user = useUser();
  console.debug("Address:", user?.address);

  useEffect(() => {
    if (!user?.address) return;
    (async () => {
      try {
        const data = await publicClient.readContract({
          address: REALIZE_IT_CONTRACT_ADDRESS,
          abi: REALIZE_IT_CONTRACT_ABI,
          functionName: "users",
          args: [user.address],
        });
        setIsVerified(data[3]);
      } catch (error) {
        console.error("Error reading contract:", error);
        setIsVerified(false);
      }
    })();
  }),
    [user];

  return isVerified;
};
