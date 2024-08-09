import React from "react";
import leaderBoardTopData from "@/leaderBoardTopData.json";
import LeaderBoardCard from "../Card";

export default function LeaderBoardTop() {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-textSoftGray text-sm">
        Top transformation participants
      </p>
      {leaderBoardTopData.map((record) => (
        <LeaderBoardCard
          key={record.position}
          position={record.position}
          name={record.name}
          stars={record.stars}
          greenPoints={record.greenPoints}
        />
      ))}
    </div>
  );
}
