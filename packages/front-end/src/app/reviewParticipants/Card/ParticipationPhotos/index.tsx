import Image from "next/image";
import React from "react";

type Props = {
  photos: string[];
};

export default function ParticipationPhotos({ photos }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-textSoftGray text-xs">Participation photo’s</p>
      <div className="grid grid-cols-3 gap-2">
        {photos.map((photo, index) => (
          <Image
            key={index}
            width={24}
            height={24}
            src={photo}
            className="w-full"
            alt={`participationPhoto: ${index}`}
          />
        ))}
      </div>
    </div>
  );
}
