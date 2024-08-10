export type ActivityType = {
  icon: string;
  name: string;
  stars?: number;
  usdc?: number;
  date: string;
};

export type ParticipantData = {
  profilePhoto: string;
  name: string;
  participationPhotos: string[];
  contributionStatement: string;
  calification: number;
  verified: boolean
};
