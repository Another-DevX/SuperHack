import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { HTMLInputTypeAttribute } from "react";

type Props = {
  label: string;
  type: HTMLInputTypeAttribute;
  placeHolder: string;
};
export default function InputWithLabel({ label, type, placeHolder }: Props) {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="text" className="text-xs text-textSoftGray">
        {label}
      </Label>
      <Input id={placeHolder} type={type} placeholder={placeHolder} />
    </div>
  );
}
