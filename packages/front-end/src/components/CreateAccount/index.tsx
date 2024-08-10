import React from "react";
import Header from "../Layout/Header";
import CreateAccountContent from "./Content";
import Image from "next/image";
import Link from "next/link";

export default function CreateAccount() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-between">
      <Header
        iconRight={() => (
          <Link
            href={"/uploadAvatar"}
            className="w-8 h-8 absolute flex justify-center items-center right-4 top-1/2 translate-y-[-50%]"
          >
            <Image
              width={22}
              height={22}
              src={"/icons/arrow-right-icon.svg"}
              alt={`plus cicle icon`}
            />
          </Link>
        )}
        text="Create Account"
      />
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
