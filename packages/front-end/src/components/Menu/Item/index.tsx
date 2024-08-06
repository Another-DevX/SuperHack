import React, { ReactNode } from "react";

type Props = {
  text: string;
  icon: ReactNode;
};

export default function MenuItem({ text, icon }: Props) {
  return (
    <div>
      {text}
      {icon}
    </div>
  );
}
