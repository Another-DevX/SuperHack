import ButtonUseCamera from "@/components/commons/ButtonUseCamera";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React from "react";

export default function UploadAvatarContent() {
  return (
    <div className="flex flex-col items-center gap-4">
      <Input
        className="w-40 h-40 flex items-center justify-center rounded-full border-2 border-buttonGreen bg-signInBg"
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
