"use client"
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
import React, { act } from "react";
import { Button } from "@/components/ui/button";
import { uploadHypercertMetadata } from "@/services/hypercerts";
import { useRouter } from "next/navigation";

export default function CreateActivity() {

  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      activityName: formData.get("activityName"),
      description: formData.get("description"),
      ageCategory: formData.get("ageCategory"),
      location: formData.get("location"),
      toolsBring: formData.get("toolsBring"),
      toolsParticipants: formData.get("toolsParticipants"),
      startDate: formData.get("startDate"),
      startTime: formData.get("startTime"),
      endDate: formData.get("endDate"),
      endTime: formData.get("endTime"),
    };
    const cid = await uploadHypercertMetadata(data.activityName as string, data.description as string);
    localStorage.removeItem("ActivityCID");
    localStorage.setItem("ActivityCID", cid.data.cid)
    router.push("/addActivityRewards");
  };

return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <InputWithLabel
        label="Activity name"
        type="text"
        placeHolder="Beach Cleanup"
        name="activityName"
      />
      <InputWithLabel
        label="Description"
        type="text"
        placeHolder="Explain Your Activity"
        name="description"
      />

      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="ageCategory" className="text-xs text-textSoftGray">
          Age category
        </Label>
        <Select name="ageCategory">
          <SelectTrigger className="text-textSoftGray">
            <SelectValue placeholder="Select age category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="under 18">Under 18</SelectItem>
              <SelectItem value="19 - 25">19 - 25</SelectItem>
              <SelectItem value="26 - 35">26 - 35</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <InputWithLabel
        label="Location"
        type="text"
        placeHolder="Netherlands, Amsterdam"
        name="location"
      />
      <div className="grid grid-cols-2 gap-2">
      <InputWithLabel label="Start date" type="text" placeHolder="02/08/2024" name="startDate" />
      <InputWithLabel label="Start time" type="text" placeHolder="10:00 AM" name="startTime" />
      <InputWithLabel label="End date" type="text" placeHolder="02/08/2024" name="endDate" />
      <InputWithLabel label="End time" type="text" placeHolder="11:00 AM" name="endTime" />
    </div>
      <InputWithLabel
        label="Tools you will bring"
        type="text"
        placeHolder="Trash bags"
        name="toolsBring"
      />
      <InputWithLabel
        label="Tools participants need to bring"
        type="text"
        placeHolder="SunBlock"
        name="toolsParticipants"
      />

      <Button type="submit" className="mt-4">
        Submit
      </Button>
    </form>
  );
}
