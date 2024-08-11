import { gql, useQuery } from "@apollo/client";

function useGetActivities() {
  const GET_CAMPAIGNS = gql`
    query GetLocations {
      campaignCreateds {
        id
        host
        pricePool
        maxQuota
        onlyVerified
        hypercertID
      }
    }
  `;

  return useQuery(GET_CAMPAIGNS);
}

export default useGetActivities;
