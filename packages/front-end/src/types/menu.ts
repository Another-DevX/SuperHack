import { ComponentType } from "react";

export type PathParamsType = {
  text: string;
  textSize?: string;
  icon?: ComponentType;
  headerIconLeft?: ComponentType | undefined;
  headerIconRight?: ComponentType | undefined;
  notSeenOnMenu?: boolean
  path: string;
};

export type LeaderBoardCardType = {
  position: number;
  name: string;
  stars: number;
  greenPoints: number;
};
