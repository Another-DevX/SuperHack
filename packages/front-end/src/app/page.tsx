"use client";
import {
  useAuthModal,
  useLogout,
  useSignerStatus,
  useUser,
} from "@account-kit/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();



  return (
    <div className="h-full w-full flex flex-col items-start overflow-scroll">
      <Image
        width={20}
        height={20}
        src={"/images/signin-img.svg"}
        alt="signin-img"
        style={{ width: "100vw", height: "auto" }}
      />
      <div className="flex flex-col gap-4 py-4 px-8">
        <Image
          width={120}
          height={120}
          src={"/icons/realize-icon.svg"}
          alt="realize-icon"
        />
        <h1 className="font-medium text-xl">
          Transform Communities, Create Heroes
        </h1>
        <p className="text-sm text-textSignIn leading-5">
          Enabling changemakers to organize activities that uplift communities
          and celebrate everyday heroes. Join, contribute, and earn rewards as
          we create impactful transformations together.
        </p>
        <w3m-button />
      </div>
    </div>
  );
}
