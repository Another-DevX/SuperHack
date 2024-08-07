import React, { ComponentType, SVGProps } from "react";

type Props = {
  text: string;
  icon: ComponentType<SVGProps<SVGSVGElement>> | undefined;
};
export default function Header({ text, icon: Icon }: Props) {
  return (
    <div className="w-full py-4 flex justify-center font-medium text-base border-b-2">
      <p className="font-semibold">{text}</p>
      {Icon && <Icon width={24} height={24} className="absolute right-4"/>}
      {!Icon && <span></span>}
    </div>
  );
}
