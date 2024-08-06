import EditIcon from "@/public/icons/edit-icon.svg";
import React from "react";

export default function MyProfile() {
  return (
    <div className="w-full pt-8 flex justify-between font-medium text-base border-b-2 pb-4">
      <span></span>
      <p className="font-semibold">MyProfile</p>
      <div className="-translate-x-4">
        <EditIcon />
      </div>
    </div>
  );
}
