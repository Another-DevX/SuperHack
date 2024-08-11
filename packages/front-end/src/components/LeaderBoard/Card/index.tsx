import ProfileStats from "@/components/MyProfile/Stats";
import { type LeaderBoardCardType } from "@/types/menu";
import Image from "next/image";
import React from "react";

type Props = LeaderBoardCardType;

export default function LeaderBoardCard({
  position,
  name,
  stars,
  greenPoints,
}: Props) {
  return (
    <div
      className={`flex items-center justify-between px-4 py-2 rounded-md ${name == "luukdao" ? "bg-softGrayBg" : "bg-white"} border-2 ${name == "luukdao" ? "border-softGrayBoderDark" : "border-softGrayBoderLight"}`}
    >
      <div className="flex items-center justify-center gap-2">
        <p>{position}.</p>
        <div className="flex items-center justify-center gap-1">
          <Image
            width={30}
            height={30}
            src="/images/profile-img.svg"
            alt="starsIcon"
          />
          <p className="text-xs font-bold">{name}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <ProfileStats value={stars} icon="/icons/stars-icon.svg" />
        <ProfileStats value={greenPoints} icon="/icons/green-points-icon.svg" />
      </div>
    </div>
  );
}
