import ActivityCard from "@/components/Activities/Card";
import activities from "@/acitivties.json";
import React from "react";

export default function Activities() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <p className="text-textSoftGray text-xs">Organized Activities</p>
        {activities.organized.map((activity) => (
          <ActivityCard
            key={activity.id}
            id={activity.id}
            icon={activity.icon}
            name={activity.name}
            stars={activity.stars}
            usdc={activity.usdc}
            date={activity.date}
            goTo="reviewParticipants"
            opaque
          />
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-textSoftGray text-xs">More Activities</p>
        {activities.more.map((activity) => (
          <ActivityCard
            key={activity.id}
            id={activity.id}
            icon={activity.icon}
            name={activity.name}
            stars={activity.stars}
            usdc={activity.usdc}
            date={activity.date}
            goTo="activity"
          />
        ))}
      </div>
    </div>
  );
}
