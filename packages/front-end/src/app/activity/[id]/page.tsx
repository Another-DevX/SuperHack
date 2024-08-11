"use client";
import ActivityContent from "@/components/Activity";
import { useEffect, useMemo, useState } from "react";

export default function Page({ params }: { params: { id: number } }) {
  const [simon, setSimon] = useState<boolean>(false);
  const [forCheckIn, setForCheckIn] = useState<boolean>(false);
  const [forCheckOut, setForCheckOut] = useState<boolean>(false);
  const isSingUp = useMemo(
    () => !!localStorage.getItem(`${params.id}-signUp`) || simon,
    [simon, params.id]
  );

  useEffect(() => {
    if (isSingUp)
      setTimeout(() => {
        setForCheckIn(true);
      }, 3000);
  }, [isSingUp, forCheckIn]);

  return (
    <ActivityContent
      id={params.id}
      name="luukdao"
      greenPoints={200}
      stars={4.9}
      usdc={200}
      maxUsdc={20}
      isSignUp={isSingUp}
      setSimon={setSimon}
      forCheckIn={forCheckIn}
      forCheckOut={forCheckOut}
      setForCheckOut={setForCheckOut}
    />
  );
}
