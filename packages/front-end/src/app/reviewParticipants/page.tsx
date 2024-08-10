import ActivityCard from "@/components/Activities/Card";
import { ActivityType } from "@/types/commons";
import React from "react";

export default function ReviewParticipants(activity: ActivityType) {
  return (
    <div>
      <ActivityCard
        icon={activity.icon}
        name={activity.name}
        date={activity.date}
      />
    </div>
  );
}
