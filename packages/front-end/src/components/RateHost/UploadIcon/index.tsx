"use client";
import Image from "next/image";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import React from "react";
import ProfileStats from "@/components/MyProfile/Stats";

export default function RateHostUploadIcon() {
  const router = useRouter();
  const onUpload = () => {
    console.log("upload")
    router.push("/activities");
  };
  return (
    <div className="z-20 w-8 h-8 absolute flex justify-center items-center right-10 top-1/2 translate-y-[-50%]">
      <Dialog>
        <DialogTrigger>
          <Image
            width={22}
            height={22}
            src={"/icons/upload-icon.svg"}
            alt={`plus cicle icon`}
          />
        </DialogTrigger>
        <DialogContent className="w-[280px] flex flex-col rounded-md bg-grayBg">
          <DialogHeader className="flex justify-center items-center gap-2">
            <Image
              width={24}
              height={24}
              src="/icons/check-icon.svg"
              alt="or img"
            />
            <DialogTitle>Rewards Earned</DialogTitle>
            <DialogDescription>
              <div className="flex gap-4">
                <ProfileStats icon="/icons/usdc-icon.svg" value={10} />
                <ProfileStats icon="/icons/green-points-icon.svg" value={10} />
              </div>
            </DialogDescription>
            <div className="w-full btn tex-xs text-white bg-buttonGreen">
              <DialogClose onClick={onUpload}>
                <p>Continue</p>
              </DialogClose>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
