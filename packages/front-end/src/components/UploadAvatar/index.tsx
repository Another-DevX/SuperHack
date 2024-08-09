import React from "react";
import Header from "../Layout/Header";
import ArrowLeftIcon from "@/public/icons/arrow-left-icon.svg";
import SaveIcon from "@/public/icons/save-icon.svg";
import Image from "next/image";
import UploadAvatarContent from "./Content";

export default function UploadAvatar() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-between">
      <Header
        iconLeft={ArrowLeftIcon}
        iconRight={SaveIcon}
        text="Upload Avatar"
      />
      <div className="w-full h-full p-4 overflow-y-scroll">
        <UploadAvatarContent />
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
