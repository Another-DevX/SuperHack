import React, { ComponentType, SVGProps} from "react";

type Props = {
  text: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export function MenuItem({ text, icon: Icon}: Props) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-1">
      <Icon width={24} height={24}/>
      {text}
    </div>
  );
}
