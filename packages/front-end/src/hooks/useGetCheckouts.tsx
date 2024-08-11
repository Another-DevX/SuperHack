import { gql, useQuery } from '@apollo/client';

function useGetCheckouts() {
  const GET_CHECKOUTS = gql`
    query GetCheckouts {
      checkOuts() {
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
