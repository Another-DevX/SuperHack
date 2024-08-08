import ProfileStats from "@/components/MyProfile/Stats";
import Image from "next/image";
import React from "react";

type Props = {
  icon: string;
  name: string;
  stars: number;
  usdc: number;
  date: string
};

export default function ActivityCard({ icon, name, stars, usdc, date }: Props) {
  return (
    <div className="flex justify-between bg-white rounded-md p-2">
      <div className="flex gap-2 items-start">
        <Image
          width={16}
          height={16}
          src={icon}
          alt={`activity-card-icon-${name}`}
        />
        <div>
          <p className="font-semibold">{name}</p>
          <p className="text-textSoftGray text-xs">{date}</p>
        </div>
      </div>
      <div className="flex justify-center items-center gap-1">
        <ProfileStats value={stars} icon="/icons/stars-icon.svg" />
        <ProfileStats value={usdc} icon="/icons/usdc-icon.svg" />
      </div>
    </div>
  );
}
