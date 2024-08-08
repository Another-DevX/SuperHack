import { MenuItemType } from "@/types/menu";
import ActivitiesIcon from "@/public/icons/activities-menu-icon.svg";
import WalletIcon from "@/public/icons/wallet-menu-icon.svg";
import LeaderBoardIcon from "@/public/icons/leaderboard-menu-icon.svg";
import ProfileIcon from "@/public/icons/profile-menu-icon.svg";
import EditIcon from "@/public/icons/edit-icon.svg";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const pathToMenuItem = (path: string) => {
  const section = path.split("/")[1];
  return menuItems.find((menuItem) => menuItem.path == section);
};

export const menuItems: MenuItemType[] = [
  {
    text: "Activities",
    icon: ActivitiesIcon,
    path: "activities",
  },
  {
    text: "Wallet",
    icon: WalletIcon,
    path: "Wallet",
  },
  {
    text: "LeaderBoard",
    icon: LeaderBoardIcon,
    path: "leaderBoard",
  },
  {
    text: "Profile",
    icon: ProfileIcon,
    headerIcon: EditIcon,
    path: "profile",
  },
];
