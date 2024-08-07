import Image from "next/image";
import React from "react";

export default function MyProfilePhoto() {
  return (
    <Image
      width={80}
      height={80}
      src="/images/profile-img.svg"
      alt="starsIcon"
    />
  );
}
