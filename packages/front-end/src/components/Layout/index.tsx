"use client";
import React, { ReactNode } from "react";
import Menu from "./Menu";
import Header from "./Header";
import { usePathname } from "next/navigation";
import { pathToMenuItem } from "@/constants/pathParams";
import CreateAccount from "../CreateAccount";
import UploadAvatar from "../UploadAvatar";
import Image from "next/image";

export const PageLayout = ({
  children,
}: {
  children: ReactNode;
}): ReactNode => {
  const pathName = usePathname();
  const item = pathToMenuItem(pathName);

  if (pathName == "/")
    return (
      <main className="w-screen h-screen flex items-center justify-center bg-signInBg">
        <div className="relative w-[320px] h-[600px] pt-10 pb-4 flex flex-col items-start">
          {children}
          <Image
            width={120}
            height={120}
            src={"/images/phone-frame-img.png"}
            alt="phone-frame-img"
            style={{
              zIndex: 1,
              top: 0,
              position: "absolute",
              width: "100%",
              height: "100%",
              pointerEvents: "none",
            }}
          />
        </div>
      </main>
    );

  if (pathName == "/createAccount")
    return (
      <main className="w-screen h-screen flex items-center justify-center bg-signInBg">
        <div className="relative w-[320px] h-[600px] pt-10 pb-4 flex flex-col items-start justify-start">
          <CreateAccount />
          <Image
            width={120}
            height={120}
            src={"/images/phone-frame-img.png"}
            alt="phone-frame-img"
            style={{
              zIndex: 1,
              top: 0,
              position: "absolute",
              width: "100%",
              height: "100%",
              pointerEvents: "none",
            }}
          />
        </div>
      </main>
    );

  if (pathName == "/uploadAvatar")
    return (
      <main className="w-screen h-screen flex items-center justify-center bg-signInBg">
        <div className="relative w-[320px] h-[600px] pt-10 pb-4 flex flex-col items-start justify-start">
          <UploadAvatar />
          <Image
            width={120}
            height={120}
            src={"/images/phone-frame-img.png"}
            alt="phone-frame-img"
            style={{
              zIndex: 1,
              top: 0,
              position: "absolute",
              width: "100%",
              height: "100%",
              pointerEvents: "none",
            }}
          />
        </div>
      </main>
    );

  return (
    <>
      <main className="w-screen h-screen flex items-center justify-center">
        <div className="relative w-[320px] h-[600px] pt-8 pb-4 flex flex-col items-center justify-between">
          <Header
            text={item?.text ? item.text : ""}
            textSize={item?.textSize}
            iconLeft={item?.headerIconLeft}
            iconRight={item?.headerIconRight}
          />
          <div className="w-full h-full py-4 px-8 overflow-y-scroll">
            {children}
          </div>
          <Menu />
          <Image
            width={120}
            height={120}
            src={"/images/phone-frame-img.png"}
            alt="phone-frame-img"
            style={{
              zIndex: 1,
              top: 0,
              position: "absolute",
              width: "100%",
              height: "100%",
              pointerEvents: "none",
            }}
          />
        </div>
      </main>
    </>
  );
};
