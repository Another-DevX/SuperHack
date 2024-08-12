import ActivityCard from "@/components/Activities/Card";
import ProfileStats from "@/components/MyProfile/Stats";
import Image from "next/image";
import React, { Dispatch, SetStateAction } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useUser } from "@account-kit/react";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import ActivityCheckoutButton from "./CheckoutButton";

type Props = {
  id: number;
  name: string;
  stars: number;
  greenPoints: number;
  usdc: number;
  maxUsdc: number;
  setSimon: Dispatch<SetStateAction<boolean>>;
  isSignUp: boolean;
  forCheckIn: boolean;
  forCheckOut: boolean;
  setForCheckOut: Dispatch<SetStateAction<boolean>>;
};

export default function ActivityContent({
  id,
  name,
  stars,
  greenPoints,
  maxUsdc,
  setSimon,
  isSignUp,
  forCheckIn,
  forCheckOut,
  setForCheckOut,
}: Props) {
  const user = useUser();
  const { mutate: signUp, isPending: isSignUpPending } = useMutation({
    mutationFn: async () => {
      if (!user) return;
      const response = await axios.post("/api/signUp", {
        address: user?.address,
        hypercertID: id,
      });
      return {
        data: response.data,
        hypercertID: id,
      };
    },
    onSuccess: (data) => {
      setSimon(true);
      console.debug("signUp", data);
      localStorage.setItem(`${data?.hypercertID}-signUp`, data?.data.receipt);
    },
  });

  const { mutate: signOut, isPending: isSignOutPending } = useMutation({
    mutationFn: async () => {
      return await axios.post("/api/signOut", {
        attestationID: localStorage.getItem(`${id}-signUp`),
      });
    },
  });

  const onCheckIn = () => {
    setTimeout(() => {
      setForCheckOut(true);
    }, 3000);
  };

  return (
    <div className="relative flex flex-col gap-2">
      <ActivityCard
        id={0}
        key={"activity"}
        icon={"/icons/broom-icon.svg"}
        name={"Beach Cleanup"}
        stars={4.9}
        usdc={200}
        date={"August 7th"}
        active
        opaque
      />
      <div className="flex gap-2">
        <div className="flex-1 flex flex-col gap-2 bg-white p-4 rounded-md">
          <p className="font-semibold">{name}</p>
          <div className="flex flex-col items-start gap-2">
            <ProfileStats icon="/icons/stars-icon.svg" value={stars} />
            <ProfileStats
              icon="/icons/green-points-icon.svg"
              value={greenPoints}
            />
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-2 bg-white p-4 rounded-md">
          <p className="font-semibold">Rewards</p>
          <div className="flex flex-col items-start gap-2">
            <ProfileStats icon="/icons/usdc-icon.svg" value={stars} />
            <ProfileStats
              icon="/icons/people-icon.svg"
              value={`Max ${maxUsdc}`}
            />
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col gap-2 bg-white p-4 rounded-md">
        <p className="font-semibold">Description</p>
        <p className="text-xs text-textSoftGray">
          {
            "Join us for a beach cleanup! Help keep our coast clean and protect marine life. It's a great way to give back, meet new people, and enjoy the beach. Everyone is welcome!"
          }
        </p>
      </div>
      <div className="flex-1 flex flex-col gap-2 bg-white p-4 rounded-md">
        <p className="font-semibold">Location</p>
        <p className="text-xs text-textSoftGray">{"Netherlands, Amsterdam"}</p>
      </div>
      <div className="flex-1 flex flex-col gap-2 bg-white p-4 rounded-md">
        <p className="font-semibold">Tools</p>
        <div className="flex flex-col gap-1">
          <p className="text-xs text-textSoftGray">{"Avaiable"}</p>
          <p className="text-xs text-textSoftGray">{" * Trash bags"}</p>
          <p className="text-xs text-textSoftGray">{" * Drinking water"}</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-xs text-textSoftGray">{"Required to bring:"}</p>
          <p className="text-xs text-textSoftGray">{" * Cup"}</p>
          <p className="text-xs text-textSoftGray">{" * Sunblock"}</p>
        </div>
      </div>
      {!isSignUp && !forCheckIn && !forCheckOut && (
        <Button
          disabled={isSignUpPending}
          onClick={() => signUp()}
          className="w-full btn bg-buttonGreen tex-xs text-white"
        >
          {isSignUpPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          <p>Sign Up</p>
        </Button>
      )}
      {isSignUp && !forCheckIn && !forCheckOut && (
        <Button
          disabled={isSignOutPending}
          onClick={() => signOut()}
          className="w-full btn bg-buttonYellow tex-xs text-white"
        >
          {isSignOutPending && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          <p>Withdraw</p>
        </Button>
      )}
      {isSignUp && forCheckIn && !forCheckOut && (
        <button
          onClick={onCheckIn}
          className="w-full btn bg-buttonGreen tex-xs text-white"
        >
          <p>Check In</p>
          <Image
            width={20}
            height={20}
            src="/icons/check-in-icon.svg"
            alt="or img"
          />
        </button>
      )}
      {isSignUp && forCheckIn && forCheckOut && (
        <ActivityCheckoutButton id={id} />
      )}
    </div>
  );
}
