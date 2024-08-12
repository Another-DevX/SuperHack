import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { UseMutateFunction } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  id: number;
  checkoutFn: UseMutateFunction<AxiosResponse<any, any>, Error, void, unknown>;
  isCheckoutPending: boolean;
};

export default function ActivityCheckoutButton({
  id,
  checkoutFn,
  isCheckoutPending,
}: Props) {
  return (
    <Dialog>
      <DialogTrigger>
        <div className="w-full btn bg-buttonGreen tex-xs text-white">
          {isCheckoutPending && <p>Check Out</p>}
          {!isCheckoutPending && <Skeleton />}
        </div>
      </DialogTrigger>
      <DialogContent className="w-[280px] flex flex-col rounded-md bg-grayBg">
        <DialogHeader className="flex justify-center items-center gap-2">
          <Image
            width={24}
            height={24}
            src="/icons/check-icon.svg"
            alt="or img"
          />
          <DialogTitle>Check Out</DialogTitle>
          <DialogDescription>
            Are you sure you want to check-out? You cannot check back in to this
            current activity
          </DialogDescription>
          <div className="w-full flex gap-2">
            <div className="flex-1 btn tex-xs text-black border-buttonGreen border-2">
              <DialogClose>
                <p>Cancel</p>
              </DialogClose>
            </div>
            <div
              onClick={() => checkoutFn()}
              className="flex-1 btn bg-buttonGreen tex-xs text-white"
            >
              <p>Check Out</p>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
