import EditIcon from "@/public/icons/edit-icon.svg";
import React from "react";

export default function Header() {
  return (
    <div className="w-full py-4 flex justify-between font-medium text-base border-b-2">
      <span></span>
      <p className="font-semibold">MyProfile</p>
      <div className="-translate-x-4">
        <EditIcon />
      </div>
    </div>
  );
}
