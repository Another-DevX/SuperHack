import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";
import ParticipationPhotos from "./ParticipationPhotos";
import { ParticipantData } from "@/types/commons";

type Props = {
  icon: string;
  name: string;
  photos: string[];
  contributionStatement: string;
  calification: number;
  verified: boolean;
  participantsState: {
    participants: ParticipantData[];
    setParticipants: React.Dispatch<React.SetStateAction<ParticipantData[]>>;
  };
};

export default function ReviewCard({
  icon,
  name,
  photos,
  contributionStatement,
  calification,
  verified,
  participantsState,
}: Props) {
  const updateParticipantCalification = (calification: number) => {
    participantsState.setParticipants((prevParticipants) =>
      prevParticipants.map((participant) =>
        participant.name === name
          ? { ...participant, calification: calification, verified: true }
          : participant
      )
    );
  };
  return (
    <div className="w-full flex bg-white rounded-md px-3">
      <Accordion className="w-full border-b-0" type="single" collapsible>
        <AccordionItem className="border-b-0" value="item-1">
          <AccordionTrigger>
            <div className="w-full flex gap-2 items-center justify-between pr-2">
              <div className="flex gap-2 items-center">
                <Image width={24} height={24} src={icon} alt="starsIcon" />
                <p>{name}</p>
              </div>
              {verified && (
                <Image
                  width={20}
                  height={20}
                  src="/icons/verified-icon.svg"
                  alt="starsIcon"
                />
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4">
            <ParticipationPhotos photos={photos} />
            <div className="flex flex-col gap-2">
              <p className="text-textSoftGray text-xs">
                Contribution statement
              </p>
              <div className="p-2 bg-generalBg rounded-md">
                {contributionStatement}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-textSoftGray text-xs">Rate participant</p>
              <div className="flex">
                {Array.from(
                  { length: calification },
                  (_, index) => index + 1
                ).map((index) => (
                  <Image
                    onClick={() => updateParticipantCalification(index)}
                    key={index}
                    width={28}
                    height={28}
                    src="/icons/calification-star-yellow-icon.svg"
                    alt="starsIcon"
                  />
                ))}
                {Array.from(
                  { length: 5 - calification },
                  (_, index) => index + 1
                ).map((index) => (
                  <Image
                    onClick={() =>
                      updateParticipantCalification(index + calification)
                    }
                    key={index}
                    width={28}
                    height={28}
                    src="/icons/calification-star-icon.svg"
                    alt="starsIcon"
                  />
                ))}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
