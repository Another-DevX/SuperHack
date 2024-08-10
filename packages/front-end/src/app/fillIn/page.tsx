import React from "react";
import ActivityCard from "../../components/Activities/Card";
import InputWithLabel from "../../components/MyProfile/Data";

export default function FillIn() {
  return (
    <div className="flex flex-col gap-4">
      <ActivityCard
        icon={"/icons/broom-icon.svg"}
        name={"Beach Cleanup"}
        date={"August 7th, 12:00 - 18:00"}
        iconSize={28}
        opaque={true}
      />
      <div className="flex flex-col gap-2">
        <InputWithLabel
          label="Transformation statement"
          type="text"
          placeHolder="Land clearing"
          height={40}
        />
        <InputWithLabel
          label="Takeaways"
          type="text"
          placeHolder="things"
        />
      </div>
    </div>
  );
}
