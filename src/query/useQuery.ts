import { useToast } from "@/components/ui/use-toast";
import { useCallback, useEffect, useState } from "react";

import { useCache } from "./cache";

type useQueryProps<TParams, TResponse> = {
  queryFn: (params?: TParams) => Promise<TResponse>;
  queryKey: string;
  initialParams?: TParams;
};

export const useQuery = <TParams, TResponse>({
  queryFn,
  queryKey,
  initialParams,
}: useQueryProps<TParams, TResponse>) => {
  const [data, setData] = useState<TResponse | undefined>();
  const [error, setError] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  const { data: cacheData, setData: setCacheData } = useCache();
  const { toast } = useToast();

  const runQuery = useCallback(
    async (params?: TParams, extraQueryKeys: string = "") => {
      try {
        // Check if the value is in the cache using the query key

        if (queryKey + extraQueryKeys in cacheData) {
          setData(cacheData[queryKey + extraQueryKeys] as TResponse);
          return;
        }
        // If not fetch it from the backend
        // If yes return the value from the cache
        // for now assume we do not have a cache
        setIsLoading(true);
        const response = await queryFn(params);
        setIsLoading(false);
        // Set the value to cache
        setData(response);
        setCacheData(queryKey + extraQueryKeys, response);
        setError(undefined);
        console.log(response);
        return response;
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
          toast({
            variant: "destructive",
            title: "Error",
            description: error.message,
          });
          return;
        }
        setError("An error occured");
        toast({
          variant: "destructive",
          title: "Error",
          description: "An error occured",
        });
        throw Error;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useEffect(() => {
    runQuery(initialParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isLoading,
    data,
    error,
    runQuery,
  };
};
