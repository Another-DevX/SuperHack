import React from "react";
import Header from "../Layout/Header";
import Image from "next/image";
import UploadAvatarContent from "./Content";
import Link from "next/link";

export default function UploadAvatar() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-between">
      <Header
        iconLeft={() => (
          <Link
            href={"/createAccount"}
            className="w-8 h-8 absolute flex justify-center items-center left-6 top-1/2 translate-y-[-50%]"
          >
            <Image
              width={22}
              height={22}
              src={"/icons/arrow-left-icon.svg"}
              alt={`plus cicle icon`}
            />
          </Link>
        )}
        iconRight={() => (
          <Link
            href={"/activities"}
            className="w-8 h-8 absolute flex justify-center items-center right-6 top-1/2 translate-y-[-50%]"
          >
            <Image
              width={22}
              height={22}
              src={"/icons/save-icon.svg"}
              alt={`save-icon`}
            />
          </Link>
        )}
        text="Upload Avatar"
      />
      <div className="w-full h-full py-4 px-8 overflow-y-scroll">
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
