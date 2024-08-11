import ButtonUseCamera from "@/components/commons/ButtonUseCamera";
import { Input } from "@/components/ui/input";
import { useUser } from "@account-kit/react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import React from "react";

export default function UploadAfterImages() {
  // const user = useUser();

  // const { mutate: checkout, isPending: isCheckoutPending } = useMutation({
  //   mutationFn: async () => {
  //     if (!user) return;
  //     return await axios.post('/api/hostReview', {
  //       address: user?.address,
  //       hypercertID: '4083388403051261561560495289181218537473',
  //       reviews: [
  //         {
  //           stars: 4,
  //           user: '0x1726cf86DA996BC4B2F393E713f6F8ef83f2e4f6',
  //         },
  //       ],
  //     });
  //   },
  // });

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
