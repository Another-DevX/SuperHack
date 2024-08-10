import React, { ComponentType, SVGProps } from "react";

type Props = {
  text: string;
  iconLeft?: ComponentType<SVGProps<SVGSVGElement>> | undefined;
  iconRight?: ComponentType<SVGProps<SVGSVGElement>> | undefined;
};
export default function Header({
  text,
  iconLeft: IconLeft,
  iconRight: IconRight,
}: Props) {
  return (
    <div className="relative w-full py-4 flex justify-center items-center font-medium text-base border-b-2 border-softGrayBoderDark">
      {IconLeft && (
        <IconLeft
          width={24}
          height={24}
          className="absolute flex justify-center items-center left-4 top-1/2 translate-y-[-50%]"
        />
      )}
      <p className="font-semibold">{text}</p>
      {IconRight && (
        <IconRight
          width={24}
          height={24}
          className="absolute flex justify-center items-center right-4 top-1/2 translate-y-[-50%]"
        />
      )}
    </div>
  );
}
