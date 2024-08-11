import ButtonUseCamera from "@/components/commons/ButtonUseCamera";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React from "react";

export default function Page() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start gap-4 p-4 bg-white rounded-lg">
        <Image
          width={32}
          height={32}
          src={"/icons/important-icon.svg"}
          alt={`important-icon`}
        />
        <p className="text-xs text-textSoftGray">
          These images should be an after shot of the before pictures taken at
          the activity creation
        </p>
      </div>
      <Input
        className="w-full h-40 flex items-center justify-center rounded-xl border-2 border-buttonGreen bg-white"
        id="picture"
        type="file"
      />
      <Image
        width={100}
        height={100}
        src="/images/or-img.svg"
        alt="or img"
        style={{ width: "100%" }}
      />
      <ButtonUseCamera />
    </div>
  );
}
