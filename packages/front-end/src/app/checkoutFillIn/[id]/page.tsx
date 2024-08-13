import React from "react";
import ActivityCard from "@/components/Activities/Card";
import InputWithLabel from "@/components/MyProfile/Data";

export default function Page({ params }: { params: { id: number } }) {
  return (
    <div className="flex flex-col gap-4">
      <ActivityCard
        id={params.id}
        icon={"/icons/broom-icon.svg"}
        name={"Beach Cleanup"}
        date={"August 7th, 12:00 - 18:00"}
        iconSize={28}
        opaque={true}
      />
      <div className="flex flex-col gap-2">
        <InputWithLabel
          label="Contribution statement"
          type="text"
          placeHolder="Land clearing"
          name="transformation"
        />
        <InputWithLabel
          label="Takeaways"
          type="text"
          placeHolder="things"
          name="Takeaways"
        />
      </div>
    </div>
  );
}
