import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

export default function MyProfileVerify() {
  return (
    <Button className="w-auto h-8 flex gap-2 items-center justify-center bg-softGray rounded-md px-3 py-2">
      <p className="text-black text-xs font-semibold py-1">
        Verify with World ID
      </p>
      <Image
        width={16}
        height={16}
        src="/icons/wordid-icon.svg"
        alt="wordId-icon"
      />
    </Button>
  );
}
