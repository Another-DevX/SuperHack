"use client"
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";

export default function RateHostUploadIcon() {
  const router = useRouter()
  const onUpload = () => {
    router.push("activities")
  };
  return (
    <Link
      onClick={onUpload}
      href={"/activities"}
      className="z-20 w-8 h-8 absolute flex justify-center items-center right-10 top-1/2 translate-y-[-50%]"
    >
      <Image
        width={22}
        height={22}
        src={"/icons/upload-icon.svg"}
        alt={`plus cicle icon`}
      />
    </Link>
  );
}
