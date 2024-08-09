import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cookieToInitialState } from "@account-kit/core";
import "./globals.css";
import Providers from "./providers";
import { config } from "../../config";
import { headers } from "next/headers";
import { PageLayout } from "@/components/Layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(
    config,
    headers().get("cookie") ?? undefined,
  );
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers initialState={initialState}>
          <PageLayout>{children}</PageLayout>
        </Providers>
      </body>
    </html>
  );
}
