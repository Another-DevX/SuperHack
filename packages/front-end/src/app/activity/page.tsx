"use client"
import ActivityContent from "@/components/Activity";
import { useState } from "react";

export default function Activity() {
  const [account, setAccount] = useState<boolean>(false)
  return (
    <ActivityContent
      name="luukdao"
      greenPoints={200}
      stars={4.9}
      usdc={200}
      maxUsdc={20}
      account={account}
      setAccount={setAccount}
    />
  );
}
