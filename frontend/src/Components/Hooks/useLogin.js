import * as reactQuery from "@tanstack/react-query";
import { useState } from "react";
import fetchData from "../../utils/fetch-be";

const useLogin = () => {
  const queryClient = reactQuery.useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (loginDetails) => {
    return await fetchData("POST", "/api/user/login", loginDetails);
  };

  const mutation = reactQuery.useMutation(login, {
    onSuccess: (response) => {
      queryClient.invalidateQueries("userLogin");
      // Additional actions after successful login

      return response;
    },
  });

  const handleLogin = async (loginDetails) => {
    try {
      setIsLoading(true);
      return await mutation.mutateAsync(loginDetails);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { mutate: handleLogin, isLoading, error };
};

export default useLogin;
