import { PathParamsType } from "@/types/menu";
import ActivitiesIcon from "@/public/icons/activities-menu-icon.svg";
import WalletIcon from "@/public/icons/wallet-menu-icon.svg";
import LeaderBoardIcon from "@/public/icons/leaderboard-menu-icon.svg";
import ProfileIcon from "@/public/icons/profile-menu-icon.svg";
import EditIcon from "@/public/icons/edit-icon.svg";
import PlusCircleIcon from "@/public/icons/plus-circle-icon.svg";
import ArrowRightIcon from "@/public/icons/arrow-right-icon.svg";
import ArrowLeftIcon from "@/public/icons/arrow-left-icon.svg"
import UploadIcon from "@/public/icons/upload-icon.svg"
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
    headerIconLeft: CloseIcon,
    headerIconRight: ArrowRightIcon,
    notSeenOnMenu: true,
    path: "createActivity",
  },
  {
    text: "Add Activity Rewards",
    headerIconLeft: ArrowLeftIcon,
    headerIconRight: ArrowRightIcon,
    notSeenOnMenu: true,
    path: "addActivityRewards",
  },
  {
    text: "Upload Before Images",
    headerIconLeft: ArrowLeftIcon,
    headerIconRight: UploadIcon,
    notSeenOnMenu: true,
    path: "uploadBeforeImages",
  },
  {
    text: "Review Participants",
    headerIconLeft: ArrowLeftIcon,
    notSeenOnMenu: true,
    path: "reviewParticipants",
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
