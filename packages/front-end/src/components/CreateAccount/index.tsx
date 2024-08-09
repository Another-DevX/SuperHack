import React from "react";
import Header from "../Layout/Header";
import CreateAccountContent from "./Content";
import ArrowRightIcon from "@/public/icons/arrow-right-icon.svg";
import Image from "next/image";

export default function CreateAccount() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-between">
      <Header iconRight={ArrowRightIcon} text="Create Account" />
      <div className="w-full h-full p-4 overflow-y-scroll">
        <CreateAccountContent />
      </div>
      <Image
        width={100}
        height={100}
        src="/images/realize-it-img.svg"
        alt={`realize-it-img`}
        className="mb-4"
      />
    </div>
  );
}
