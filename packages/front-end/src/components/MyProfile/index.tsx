import { Button } from "@/components/ui/button";
import ProfileImg from "@/public/images/profile-img.svg";
import Image from "next/image";
import React from "react";
import ProfileStats from "./Stats";
import MyProfilePhoto from "./Photo";
import MyProfileVerify from "./Verify";
import InputWithLabel from "./Data";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  stars: number;
  greenPoints: number;
};

export default function MyProfile({ stars, greenPoints }: Props) {
  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <MyProfilePhoto />
          <div className="flex flex-col gap-1">
            <MyProfileVerify />
            <div className="flex flex-col items-start">
              <ProfileStats value={stars} icon="/icons/stars-icon.svg" />
              <ProfileStats
                value={greenPoints}
                icon="/icons/green-points-icon.svg"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <InputWithLabel label="Username" type="text" placeHolder="luukdao" />
          <InputWithLabel
            label="Age category"
            type="text"
            placeHolder="19 - 25"
          />
          <InputWithLabel
            label="Location"
            type="text"
            placeHolder="Netherlands, Amsterdam"
          />
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select a network" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Network</SelectLabel>
                <SelectItem value="Base">Base</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </>
  );
}
