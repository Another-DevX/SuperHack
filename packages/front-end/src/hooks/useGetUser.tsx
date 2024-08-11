import { gql, useQuery } from "@apollo/client";

function useGetUser(id: string) {
  const GET_USER = gql`
    query GetUser($id: Bytes!) {
      users(id: $id) {
        id,
        stars,
        points,
        name
      }
    }
  `;

  return useQuery(GET_USER, {
    variables: { id },
  });
}

export default useGetUser;
