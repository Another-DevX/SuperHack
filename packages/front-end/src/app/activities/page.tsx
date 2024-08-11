"use client";
import ActivityCard from "@/components/Activities/Card";
import React from "react";
import useGetActivities from "@/hooks/useGetActivities";
import { useUser } from "@account-kit/react";

export default function Activities() {
  const { loading, error, data } = useGetActivities();
  const user = useUser();
  console.log(data);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <p className="text-textSoftGray text-xs">Organized Activities</p>
        {data &&
          data.campaignCreateds
            .filter(
              (createdActivity: any) =>
                createdActivity && createdActivity.host == user?.address
            )
            .map((activity: any) => (
              <ActivityCard
                key={activity.hypercertID}
                id={activity.hypercertID}
                icon={"/icons/broom-icon.svg"}
                name={"Beach Cleanup"}
                stars={4.9}
                usdc={10}
                date={"August 7th, 12:00 - 18:00"}
                goTo="reviewParticipants"
                opaque
              />
            ))}
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-textSoftGray text-xs">More Activities</p>
        {data &&
          data.campaignCreateds
            .filter(
              (createdActivity: any) =>
                createdActivity && createdActivity.host != user?.address
            )
            .map((activity: any) => (
              <ActivityCard
                key={activity.hypercertID}
                id={activity.hypercertID}
                icon={"/icons/broom-icon.svg"}
                name={"Beach Cleanup"}
                stars={4.9}
                usdc={10}
                date={"August 7th, 12:00 - 18:00"}
                goTo="activity"
              />
            ))}
      </div>
    </div>
  );
}
