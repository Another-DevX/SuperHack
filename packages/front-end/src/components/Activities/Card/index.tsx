import ProfileStats from "@/components/MyProfile/Stats";
import { ActivityType } from "@/types/commons";
import Image from "next/image";
import React from "react";

type Props = ActivityType;

export default function ActivityCard({ icon, name, stars, usdc, date }: Props) {
  return (
    <div className="flex items-start justify-between bg-white rounded-lg p-2">
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
      <div className="flex justify-start items-start gap-2 px-2">
        {stars && <ProfileStats value={stars} icon="/icons/stars-icon.svg" />}
        {usdc && <ProfileStats value={usdc} icon="/icons/usdc-icon.svg" />}
      </div>
    </div>
  );
}
