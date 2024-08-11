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
      <main className="w-screen h-screen bg-signInBg overflow-scroll">
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
            width: "100vw",
            height: "100vh",
          }}
        />
      </main>
    );

  if (pathName == "/createAccount")
    return (
      <main className="w-screen h-screen  bg-signInBg overflow-scroll">
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
            width: "100vw",
            height: "100vh",
          }}
        />
      </main>
    );

  if (pathName == "/uploadAvatar")
    return (
      <main className="w-screen h-screen flex flex-col items-center justify-between bg-signInBg overflow-scroll">
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
            width: "100vw",
            height: "100vh",
          }}
        />
      </main>
    );

  return (
    <>
      <main className="pt-10 pb-4 relative w-screen h-screen flex flex-col justify-between items-center bg-generalBg">
        <Header
          text={item?.text ? item.text : ""}
          iconLeft={item?.headerIconLeft}
          iconRight={item?.headerIconRight}
        />
        <div className="z-20 w-full h-full py-4 px-8 overflow-y-scroll">
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
            width: "100vw",
            height: "100vh",
          }}
        />
      </main>
    </>
  );
};
