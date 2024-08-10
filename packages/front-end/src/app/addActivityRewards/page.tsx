import InputWithLabel from "@/components/MyProfile/Data";
import React from "react";

export default function AddActivityRewards() {
  return (
    <div className="flex flex-col gap-4">
      <InputWithLabel label="Token pool amount" type="text" placeHolder="100" />
      <InputWithLabel
        label="Reward per participant"
        type="text"
        placeHolder="10"
      />
    </div>
  );
}
