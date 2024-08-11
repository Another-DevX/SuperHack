import { gql, useQuery } from '@apollo/client';
import React from 'react';

function useGetActivities() {
  const GET_CAMPAIGNS = gql`
    query GetLocations {
      campaignCreateds() {
            id
    host
    pricePool
    maxQuota
    onlyVerified
    hypercertID
signedUsers
signedOutUsers
    }
    }
  `;

  return useQuery(GET_CAMPAIGNS);
}

export default useGetActivities;
