import { ComponentType } from "react";

export type MenuItemType = {
  text: string;
  icon: ComponentType;
  headerIcon?: ComponentType | undefined;
  path: string;
};

export type LeaderBoardCardType = {
  position: number;
  name: string;
  stars: number;
  greenPoints: number;
};
