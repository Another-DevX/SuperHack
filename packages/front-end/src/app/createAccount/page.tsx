import InputWithLabel from "@/components/MyProfile/Data";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

export default function CreateAccount() {
  return (
    <div className="flex flex-col gap-4">
      <InputWithLabel
        label="Username"
        type="text"
        placeHolder="enter unique username"
      />
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="text" className="text-xs text-textSoftGray">
          Age category
        </Label>
        <Select>
          <SelectTrigger>
            <SelectValue
              className="text-xs text-textSoftGray"
              placeholder="select age  category"
            />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="Base">under 18</SelectItem>
              <SelectItem value="Base">19 - 25</SelectItem>
              <SelectItem value="Base">26 - 35</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <InputWithLabel
        label="Location"
        type="text"
        placeHolder="enter your location"
      />
    </div>
  );
}
