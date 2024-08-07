import React from "react";
import YourRank from "../../components/LeaderBoard/YourRank";
import LeaderBoardTop from "@/components/LeaderBoard/Top";

export default function LeaderBoard() {
  return (
    <div className="flex flex-col gap-4">
      <YourRank position={2} name="luukdao" stars={4.9} greenPoints={200} />
      <LeaderBoardTop />
    </div>
  );
}
