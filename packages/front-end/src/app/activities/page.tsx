import ActivityCard from "@/components/Activities/Card";
import React from "react";

export default function Activities() {
  return (
    <div>
      <ActivityCard
        icon="/icons/broom-icon.svg"
        name="Beach Cleanup"
        stars={4.9}
        usdc={200}
        date="August 7th, 12:00 - 18:00"
      />
    </div>
  );
}
