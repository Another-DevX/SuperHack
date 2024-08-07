import { MenuItemType } from "@/types/menu";
import { MenuItem } from "./Item";
import ActivitiesIcon from "@/public/icons/activities-menu-icon.svg";
import WalletIcon from "@/public/icons/wallet-menu-icon.svg";
import LeaderBoardIcon from "@/public/icons/leaderboard-menu-icon.svg";
import ProfileIcon from "@/public/icons/profile-menu-icon.svg";
import React from "react";

export default function Menu() {
  const menuItems: MenuItemType[] = [
    {
      text: "Activities",
      icon: ActivitiesIcon,
    },
    {
      text: "Wallet",
      icon: WalletIcon,
    },
    {
      text: "LeaderBoard",
      icon: LeaderBoardIcon,
    },
    {
      text: "Profile",
      icon: ProfileIcon,
    },
  ];
  return (
    <div className="w-full px-4 py-4 border-t-slate-300 border-2">
      <div className="flex gap-2 justify-between items-center text-xs font-medium">
        {menuItems.map(({ text, icon }) => (
          <MenuItem key={text} text={text} icon={icon} />
        ))}
      </div>
    </div>
  );
}
