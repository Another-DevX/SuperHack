import { PathParamsType } from "@/types/menu";
import ActivitiesIcon from "@/public/icons/activities-menu-icon.svg";
import WalletIcon from "@/public/icons/wallet-menu-icon.svg";
import LeaderBoardIcon from "@/public/icons/leaderboard-menu-icon.svg";
import ProfileIcon from "@/public/icons/profile-menu-icon.svg";
import EditIcon from "@/public/icons/edit-icon.svg";
import PlusCircleIcon from "@/public/icons/plus-circle-icon.svg";
import ArrowRightIcon from "@/public/icons/arrow-right-icon.svg";
import CloseIcon from "@/public/icons/close-circle-icon.svg";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const pathToMenuItem = (path: string) => {
  const section = path.split("/")[1];
  return pathParams.find((menuItem) => menuItem.path == section);
};

export const pathParams: PathParamsType[] = [
  {
    text: "Activities",
    icon: ActivitiesIcon,
    headerIconRight: PlusCircleIcon,
    path: "activities",
  },
  {
    text: "Create Acitivity",
    icon: ActivitiesIcon,
    headerIconLeft: CloseIcon,
    headerIconRight: ArrowRightIcon,
    notSeenOnMenu: true,
    path: "createActivity",
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
    headerIconRight: EditIcon,
    path: "profile",
  },
];
