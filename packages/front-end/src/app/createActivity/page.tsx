import InputWithLabel from "@/components/MyProfile/Data";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import CreateActivityGridDates from "./gridDates";

export default function CreateActivity() {
  return (
    <div className="flex flex-col gap-4">
      <InputWithLabel
        label="Activity name"
        type="text"
        placeHolder="Beach Cleanup"
      />
      <InputWithLabel
        label="Description"
        type="text"
        placeHolder="Explain Your Acitivity"
        height={32}
      />

      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="text" className="text-xs text-textSoftGray">
          Age category
        </Label>
        <Select>
          <SelectTrigger className="text-textSoftGray">
            <SelectValue placeholder="select age  category" />
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
        placeHolder="Netherlands, Amsterdam"
      />
      <CreateActivityGridDates />
      <InputWithLabel
        label="Tools you will bring"
        type="text"
        placeHolder="Trash bags"
      />
      <InputWithLabel
        label="Tools participants need to bring"
        type="text"
        placeHolder="SunBlock"
      />
    </div>
  );
}
