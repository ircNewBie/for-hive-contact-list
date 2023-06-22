import { useMutation, useQueryClient } from "react-query";
import fetchData from "../../utils/fetch-be";

const login = async (credentials) => {
  // Perform login request
  const response = await fetchData("POST", "/api/user/login", credentials);
  return response;
  // Return the response data if needed
};

const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation(login, {
    onSuccess: (response) => {
      // Invalidate relevant queries in the cache after successful login
      queryClient.invalidateQueries("userData");

      // Pass the response object to the component
      // You can perform any additional actions here
      // For example, you can set the data in the component's state or trigger a callback function
      // In this example, we're just logging the response
      console.log("Login response:", response);
    },
  });
};

export default useLogin;
