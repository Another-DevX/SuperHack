"use client";
import ActivityContent from "@/components/Activity";
import { useEffect, useState } from "react";

export default function Activity() {
  const [account, setAccount] = useState<boolean>(false);
  const [forCheck, setForCheck] = useState<boolean>(false);
  useEffect(() => {
    if (account == true)
      setTimeout(() => {
        setForCheck(true);
      }, 5000);
  }, [account]);
  return (
    <ActivityContent
      name="luukdao"
      greenPoints={200}
      stars={4.9}
      usdc={200}
      maxUsdc={20}
      account={account}
      setAccount={setAccount}
      forCheck={forCheck}
    />
  );
}
