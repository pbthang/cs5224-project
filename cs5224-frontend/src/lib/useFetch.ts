import { useAuth } from "@clerk/clerk-react";

export default function useFetch() {
  const { getToken } = useAuth();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const authenticatedFetch = async (...args: any[]) => {
    return fetch(...args, {
      headers: { Authorization: `Bearer ${await getToken()}` },
    })
      .then((res) => {
        res.json();
      })
      .catch((err) => console.error(err));
  };

  return authenticatedFetch;
}
