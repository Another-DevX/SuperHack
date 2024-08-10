"use client";
import ActivityContent from "@/components/Activity";
import { useEffect, useState } from "react";

export default function Activity() {
  const [account, setAccount] = useState<boolean>(false);
  const [forCheckIn, setForCheckIn] = useState<boolean>(false);
  const [forCheckOut, setForCheckOut] = useState<boolean>(false);

  useEffect(() => {
    if (account == true)
      setTimeout(() => {
        setForCheckIn(true);
      }, 2000);
    if (forCheckIn == true) setForCheckOut(true);
  }, [account, forCheckIn]);

  return (
    <ActivityContent
      name="luukdao"
      greenPoints={200}
      stars={4.9}
      usdc={200}
      maxUsdc={20}
      account={account}
      setAccount={setAccount}
      forCheckIn={forCheckIn}
      setForCheckIn={setForCheckIn}
      forCheckOut={forCheckOut}
    />
  );
}
