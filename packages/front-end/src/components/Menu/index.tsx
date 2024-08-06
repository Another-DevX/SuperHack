import { menuItems } from "@/utils/constants";
import React from "react";

export default function Menu() {
  return (
    <div>
      {menuItems.map((item) => (
        <div>
          {item.icon}
          {item.text}
        </div>
      ))}
    </div>
  );
}
