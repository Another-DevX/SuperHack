"use client";
import ActivityContent from "@/components/Activity";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { id: number } }) {
  const [account, setAccount] = useState<boolean>(false);
  const [forCheckIn, setForCheckIn] = useState<boolean>(false);
  const [forCheckOut, setForCheckOut] = useState<boolean>(false);

  useEffect(() => {
    if (account == true)
      setTimeout(() => {
        setForCheckIn(true);
      }, 3000);
  }, [account, forCheckIn]);

  return (
    <ActivityContent
      id={params.id}
      name="luukdao"
      greenPoints={200}
      stars={4.9}
      usdc={200}
      maxUsdc={20}
      account={account}
      setAccount={setAccount}
      forCheckIn={forCheckIn}
      forCheckOut={forCheckOut}
      setForCheckOut={setForCheckOut}
    />
  );
}
