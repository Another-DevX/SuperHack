"use client";
import React, { ReactNode } from "react";
import Menu from "./Menu";
import Header from "./Header";
import { usePathname } from "next/navigation";
import { pathToMenuItem } from "@/lib/utils";
import CreateAccount from "../CreateAccount";
import UploadAvatar from "../UploadAvatar";

export const PageLayout = ({
  children,
}: {
  children: ReactNode;
}): ReactNode => {
  const pathName = usePathname();
  const item = pathToMenuItem(pathName);

  if (pathName == "/")
    return (
      <main className="w-screen h-screen bg-generalBg overflow-scroll">
        {children}
      </main>
    );

  if (pathName == "/createAccount")
    return (
      <main className="w-screen h-screen  bg-signInBg overflow-scroll">
        <CreateAccount />
      </main>
    );

  if (pathName == "/uploadAvatar")
    return (
      <main className="w-screen h-screen flex flex-col items-center justify-between bg-signInBg overflow-scroll">
        <UploadAvatar />
      </main>
    );

  return (
    <>
      <main className="w-screen h-screen flex flex-col justify-between items-center bg-generalBg">
        <Header
          text={item?.text ? item.text : ""}
          iconLeft={item?.headerIconLeft}
          iconRight={item?.headerIconRight}
        />
        <div className="w-full h-full p-4 overflow-y-scroll">{children}</div>
        <Menu />
      </main>
    </>
  );
};
