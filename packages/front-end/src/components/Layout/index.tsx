import React, { ReactNode } from "react";
import Menu from "./Menu";
import { EditIcon } from "lucide-react";
import Header from "./Header";

export const PageLayout = ({
  children,
}: {
  children: ReactNode;
}): ReactNode => {
  return (
    <>
      <main className="w-screen h-screen flex flex-col justify-between items-center">
        <Header />
        <div className="w-full h-full p-4">{children}</div>
        <Menu />
      </main>
    </>
  );
};
