import { useCallback, useEffect, useState } from "react";

type useQueryProps<TResponse> = {
  queryFn: () => Promise<TResponse>;
  queryKey: string;
};

export const useQuery = <TResponse>({
  queryFn,
  queryKey,
}: useQueryProps<TResponse>) => {
  const [data, setData] = useState<TResponse | undefined>();
  const [error, setError] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  const runQuery = useCallback(async () => {
    try {
      // Check if the value is in the cache using the query key
      // If not fetch it from the backend
      // If yes return the value from the cache
      // for now assume we do not have a cache
      setIsLoading(true);
      const response = await queryFn();
      setIsLoading(false);
      // Set the value to cache
      setData(response);
      setError(undefined);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
        setError(error.message);
        return;
      }
      setError("An error occured");
      throw Error;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    runQuery();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isLoading,
    data,
    error,
    runQuery,
  };
};
