import * as reactQuery from "@tanstack/react-query";

import fetchData from "../../utils/fetch-be";

const login = async (credentials) => {
  const { data, isError } = reactQuery.useQuery({
    queryKey: ["userLogin"],
    queryFn: () => {
      const loggedInUser = fetchData("POST", "/api/user/login", credentials);
      return loggedInUser;
    },
  });

  if (isError) {
    throw new Error("Error");
  }
};
const useLogin = () => {
  const queryClient = reactQuery.useQueryClient();

  const userLogin = reactQuery.useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      // Invalidate relevant queries in the cache after successful login
      queryClient.invalidateQueries("userLogin");

      // Pass the response object to the component
      // You can perform any additional actions here
      // For example, you can set the data in the component's state or trigger a callback function
      // In this example, we're just logging the response
      console.log("Login response:", response);
    },
  });
  return { mutate: login };
};

export default useLogin;
