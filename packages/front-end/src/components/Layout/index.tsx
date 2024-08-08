"use client";
import React, { ReactNode } from "react";
import Menu from "./Menu";
import Header from "./Header";
import { usePathname } from "next/navigation";
import { pathToMenuItem } from "@/lib/utils";

export const PageLayout = ({
  children,
}: {
  children: ReactNode;
}): ReactNode => {
  const pathName = usePathname();
  const item = pathToMenuItem(pathName);
  return (
    <>
      <main className="w-screen h-screen flex flex-col justify-between items-center bg-generalBg">
        <Header text={item?.text ? item.text : ""} icon={item?.headerIcon} />
        <div className="w-full h-full p-4 overflow-y-scroll">{children}</div>
        <Menu />
      </main>
    </>
  );
};
