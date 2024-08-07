import { ComponentType } from "react";

export type MenuItemType = {
  text: string;
  icon: ComponentType;
  headerIcon?: ComponentType | undefined;
  path: string;
};
