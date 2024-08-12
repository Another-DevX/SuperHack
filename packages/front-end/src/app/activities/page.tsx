"use client";
import ActivityCard from "@/components/Activities/Card";
import React, { useEffect, useState } from "react";
import useGetActivities from "@/hooks/useGetActivities";
import { useUser } from "@account-kit/react";

export default function Activities() {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const { loading, error, data } = useGetActivities();
  const user = useUser();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <p className="text-textSoftGray text-xs">Organized Activities</p>
        {data &&
          data.campaignCreateds
            .filter(
              (createdActivity: any) =>
                createdActivity &&
                createdActivity.host ==
                  "0x1726cf86da996bc4b2f393e713f6f8ef83f2e4f6"
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
                goTo="/reviewParticipants"
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
                createdActivity &&
                createdActivity.host != user?.address &&
                createdActivity.host !=
                  "0x1726cf86da996bc4b2f393e713f6f8ef83f2e4f6"
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
                goTo="/activity"
              />
            ))}
      </div>
    </div>
  );
}
