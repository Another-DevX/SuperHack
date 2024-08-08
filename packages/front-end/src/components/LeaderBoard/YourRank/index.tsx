import LeaderBoardCard from "../Card";
import React from "react";

type Props = {
  position: number;
  name: string;
  stars: number;
  greenPoints: number;
};
export default function YourRank({
  position,
  name,
  stars,
  greenPoints,
}: Props) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-textSoftGray text-sm">Your rank</p>
      <LeaderBoardCard
        position={position}
        name={name}
        stars={stars}
        greenPoints={greenPoints}
      />
    </div>
  );
}
