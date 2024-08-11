import { gql, useQuery } from '@apollo/client';

function useGetCheckouts() {
  const GET_CHECKOUTS = gql`
    query GetCheckouts {
      hostRevieweds() {
            id,
            user,
            hypercertID,
            hostRate
            }
    }
  `;

  return useQuery(GET_CHECKOUTS);
}

export default useGetCheckouts;
