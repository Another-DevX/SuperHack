"use client";
import {
  useAuthModal,
  useLogout,
  useSignerStatus,
  useUser,
} from "@account-kit/react";
import Image from "next/image";

export default function Home() {
  const user = useUser();
  const { openAuthModal } = useAuthModal();
  const signerStatus = useSignerStatus();
  const { logout } = useLogout();

  return (
    <div className="pt-16">
      <Image
        width={20}
        height={20}
        src={"/images/signin-img.svg"}
        alt="signin-img"
        style={{ width: "100vw", height: "auto" }}
      />
      <div className="flex flex-col gap-4 p-4">
        <Image
          width={120}
          height={120}
          src={"/icons/realize-icon.svg"}
          alt="realize-icon"
        />
        <h1 className="font-medium text-xl">
          Transform Communities, Create Heroes
        </h1>
        <p className="text-sm text-textSignIn leading-5">
          Enabling changemakers to organize activities that uplift communities
          and celebrate everyday heroes. Join, contribute, and earn rewards as
          we create impactful transformations together.
        </p>
        {signerStatus.isInitializing ? (
          <>Loading...</>
        ) : user ? (
          <div className="flex flex-col gap-2 p-2">
            <p className="text-xl font-bold">Success!</p>
            You&apos;re logged in as {user.email ?? "anon"}.
            <button className="w-full" onClick={() => logout()}>
              Log out
            </button>
          </div>
        ) : (
          <button
            className="btn bg-buttonGreen text-white"
            onClick={openAuthModal}
          >
            Sign In
          </button>
        )}
      </div>
    </div>
  );
}
