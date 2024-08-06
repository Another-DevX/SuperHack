import React, { ReactNode } from "react";

export const PageLayout = ({ children }: { children: ReactNode }): ReactNode => {
  return (
    <>
      <header>
      </header>

      <main>
        {children}

      </main>
    </>
  );
};
