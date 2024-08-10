import ActivityCard from "@/components/Activities/Card";
import ProfileStats from "@/components/MyProfile/Stats";
import React, { Dispatch, SetStateAction } from "react";

type Props = {
  name: string;
  stars: number;
  greenPoints: number;
  usdc: number;
  maxUsdc: number;
  account: boolean;
  setAccount: Dispatch<SetStateAction<boolean>>;
};
export default function ActivityContent({
  name,
  stars,
  greenPoints,
  maxUsdc,
  account,
  setAccount,
}: Props) {
  return (
    <div className="flex flex-col gap-2">
      <ActivityCard
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
      {!account && (
        <button
          onClick={() => setAccount(true)}
          className="w-full btn bg-buttonGreen tex-xs text-white"
        >
          <p>Sign Up</p>
        </button>
      )}
      {account && (
        <button className="w-full btn bg-buttonYellow tex-xs text-white">
          <p>Withdraw</p>
        </button>
      )}
    </div>
  );
}
