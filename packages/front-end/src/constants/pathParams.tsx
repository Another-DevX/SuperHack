import { PathParamsType } from "@/types/menu";
import ActivitiesIcon from "@/public/icons/activities-menu-icon.svg";
import WalletIcon from "@/public/icons/wallet-menu-icon.svg";
import LeaderBoardIcon from "@/public/icons/leaderboard-menu-icon.svg";
import ProfileIcon from "@/public/icons/profile-menu-icon.svg";
import EditIcon from "@/public/icons/edit-icon.svg";
import ArrowRightIcon from "@/public/icons/arrow-right-icon.svg";
import ArrowLeftIcon from "@/public/icons/arrow-left-icon.svg";
import UploadIcon from "@/public/icons/upload-icon.svg";
import Link from "next/link";
import Image from "next/image";

export const pathToMenuItem = (path: string) => {
  const section = path.split("/")[1];
  return pathParams.find((menuItem) => menuItem.path == section);
};

export const pathParams: PathParamsType[] = [
  {
    text: "Activities",
    icon: ActivitiesIcon,
    headerIconRight: () => (
      <Link
        href={"/createActivity"}
        className="w-8 h-8 absolute flex justify-center items-center right-4 top-1/2 translate-y-[-50%]"
      >
        <Image
          width={20}
          height={20}
          src={"/icons/plus-circle-icon.svg"}
          alt={`plus cicle icon`}
        />
      </Link>
    ),
    path: "activities",
  },
  {
    text: "Create Acitivity",
    headerIconLeft: () => (
      <Link
        href={"/activities"}
        className="w-8 h-8 absolute flex justify-center items-center left-4 top-1/2 translate-y-[-50%]"
      >
        <Image
          width={20}
          height={20}
          src={"/icons/close-circle-icon.svg"}
          alt={`plus cicle icon`}
        />
      </Link>
    ),
    headerIconRight: () => (
      <Link
        href={"/addActivityRewards"}
        className="w-8 h-8 absolute flex justify-center items-center right-4 top-1/2 translate-y-[-50%]"
      >
        <Image
          width={20}
          height={20}
          src={"/icons/arrow-right-icon.svg"}
          alt={`plus cicle icon`}
        />
      </Link>
    ),
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
    headerIconRight: ArrowRightIcon,
    notSeenOnMenu: true,
    path: "reviewParticipants",
  },
  {
    text: "Fill In",
    headerIconLeft: ArrowLeftIcon,
    headerIconRight: ArrowRightIcon,
    notSeenOnMenu: true,
    path: "fillIn",
  },
  {
    text: "Upload After Images",
    headerIconLeft: ArrowLeftIcon,
    headerIconRight: UploadIcon,
    notSeenOnMenu: true,
    path: "uploadAfterImages",
  },
  {
    text: "Rate Host",
    headerIconLeft: ArrowLeftIcon,
    headerIconRight: UploadIcon,
    notSeenOnMenu: true,
    path: "rateHost",
  },
  {
    text: "Activity",
    headerIconLeft: ArrowLeftIcon,
    notSeenOnMenu: true,
    path: "activity",
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
