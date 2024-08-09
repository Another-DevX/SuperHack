"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import React, { ReactNode } from "react";
import { AlchemyClientState } from "@account-kit/core";
import { config, queryClient } from "../../config";
import { AlchemyAccountProvider } from "@account-kit/react";

export default function Providers({
  children,
  initialState,
}: {
  children: ReactNode;
  initialState?: AlchemyClientState;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <AlchemyAccountProvider
        config={config}
        queryClient={queryClient}
        initialState={initialState}
      >
        {children}
      </AlchemyAccountProvider>
    </QueryClientProvider>
  );
}
