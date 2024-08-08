import ActivityCard from "@/components/Activities/Card";
import activities from "@/acitivties.json";
import React from "react";

export default function Activities() {
  return (
    <div className="flex flex-col gap-2">
      {activities.map((activity) => (
        <ActivityCard
          key={activity.name}
          icon={activity.icon}
          name={activity.name}
          stars={activity.stars}
          usdc={activity.usdc}
          date={activity.date}
        />
      ))}
    </div>
  );
}
