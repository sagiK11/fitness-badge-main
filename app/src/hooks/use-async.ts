import { toast } from "@/components/toast";
import React from "react";

type Func<D, R> = (data: D) => Promise<R | undefined>;

interface IUseAsync<D, R> {
  func: Func<D, R>;
}

type ReturnType<D, R> = [Func<D, R>, { isLoading: boolean }];

export function useAsync<D = any, R = any>(
  options: IUseAsync<D, R>
): ReturnType<D, R> {
  const { func } = options;
  const [isLoading, setIsLoading] = React.useState(false);

  const asyncFunc = async (data: D) => {
    try {
      setIsLoading(true);
      return await func(data);
    } catch (error) {
      console.error(error);
      toast.showError(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  return [asyncFunc, { isLoading }];
}

function getErrorMessage(error: any) {
  if (!error?.message) {
    return "אוי, משהו השתבש";
  }
  return error.message;
}
