import React, { ReactNode } from "react";
import Menu from "../Menu";

export const PageLayout = ({
  children,
}: {
  children: ReactNode;
}): ReactNode => {
  return (
    <>
      <main className="w-screen h-screen flex flex-col justify-between items-center">
        {children}
        <Menu />
      </main>
    </>
  );
};
