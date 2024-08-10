import InputWithLabel from "@/components/MyProfile/Data";
import React from "react";

export default function CreateActivityGridDates() {
  return (
    <div className="grid grid-cols-2 gap-2">
      <InputWithLabel label="Start date" type="text" placeHolder="02/08/2024" />
      <InputWithLabel label="Start time" type="text" placeHolder="10:00 AM" />
      <InputWithLabel label="End date" type="text" placeHolder="02/08/2024" />
      <InputWithLabel label="End time" type="text" placeHolder="11:00 AM" />
    </div>
  );
}
