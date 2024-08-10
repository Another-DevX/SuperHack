"use client";
import ActivityCard from "@/components/Activities/Card";
import React, { useState } from "react";
import ReviewCard from "./Card";
import participantsData from "@/participantsData.json";
import { ParticipantData } from "@/types/commons";

export default function ReviewParticipants() {
  const [participants, setParticipants] =
    useState<ParticipantData[]>(participantsData);
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
        <p className="text-textSoftGray text-xs">
          participants ({participants.length})
        </p>
        {participants.map((participant, index) => (
          <ReviewCard
            key={participant.name}
            icon={participant.profilePhoto}
            name={participant.name}
            photos={participant.participationPhotos}
            calification={participant.calification}
            verified={participant.verified}
            contributionStatement={participant.contributionStatement}
            participantsState={{
              participants: participants,
              setParticipants: setParticipants,
            }}
          />
        ))}
      </div>
    </div>
  );
}
