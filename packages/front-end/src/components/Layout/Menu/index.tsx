import { MenuItem } from "./Item";
import { menuItems } from "@/lib/utils";
import React from "react";
import Link from "next/link";

export default function Menu() {
  return (
    <div className="w-full px-4 py-4 border-t-slate-300 border-2">
      <div className="flex gap-2 justify-between items-center text-xs font-medium">
        {menuItems.map(({ text, icon, path }) => (
          <Link href={path} className="cursor-pointer">
            <MenuItem key={text} text={text} icon={icon} />
          </Link>
        ))}
      </div>
    </div>
  );
}
