"use client"
import { useRouter } from "next/router";
import React, { ComponentType, SVGProps } from "react";

type Props = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};
export default function CreateNewActivityIcon({ icon: Icon }: Props) {
  const router = useRouter();
  const handleClick = () => {
    router.push("/createActivity");
  };
  return <Icon width={24} height={24} onClick={handleClick} />;
}
