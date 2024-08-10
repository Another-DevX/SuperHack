import ActivityCard from "@/components/Activities/Card";
import ProfileStats from "@/components/MyProfile/Stats";
import Image from "next/image";
import React, { Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import Link from "next/link";
import { DialogClose } from "@radix-ui/react-dialog";

type Props = {
  id: number
  name: string;
  stars: number;
  greenPoints: number;
  usdc: number;
  maxUsdc: number;
  account: boolean;
  setAccount: Dispatch<SetStateAction<boolean>>;
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
  account,
  setAccount,
  forCheckIn,
  forCheckOut,
  setForCheckOut,
}: Props) {
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
      {!account && !forCheckIn && !forCheckOut && (
        <button
          onClick={() => setAccount(true)}
          className="w-full btn bg-buttonGreen tex-xs text-white"
        >
          <p>Sign Up</p>
        </button>
      )}
      {account && !forCheckIn && !forCheckOut && (
        <button className="w-full btn bg-buttonYellow tex-xs text-white">
          <p>Withdraw</p>
        </button>
      )}
      {account && forCheckIn && !forCheckOut && (
        <button
          onClick={() => setForCheckOut(true)}
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
      {account && forCheckIn && forCheckOut && (
        <Dialog>
          <DialogTrigger>
            <div className="w-full btn bg-buttonGreen tex-xs text-white">
              <p>Check Out</p>
            </div>
          </DialogTrigger>
          <DialogContent className="flex flex-col rounded-md bg-grayBg">
            <DialogHeader className="flex justify-center items-center gap-2">
              <Image
                width={24}
                height={24}
                src="/icons/check-icon.svg"
                alt="or img"
              />
              <DialogTitle>Check Out</DialogTitle>
              <DialogDescription>
                Are you sure you want to check-out? You cannot check back in to
                this current activity
              </DialogDescription>
              <div className="w-full flex gap-2">
                <div className="flex-1 btn tex-xs text-black border-buttonGreen border-2">
                  <DialogClose>
                    <p>Cancel</p>
                  </DialogClose>
                </div>
                <Link
                  href={`/fillIn/${id}`}
                  className="flex-1 btn bg-buttonGreen tex-xs text-white"
                >
                  <p>Check Out</p>
                </Link>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
