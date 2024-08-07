import Image from "next/image";
import React from "react";

type Props = {
  value: number
  icon: string
}
export default function MyProfileStats({value, icon}: Props) {
  return (
    <div className="flex gap-1 items-center">
      <p className="font-semibold text-sm">{value}</p>
      <Image
        width={16}
        height={16}
        src={icon}
        alt="starsIcon"
      />
    </div>
  );
}
