import ApiClient from "@api/client/src";
import { useAppSelector } from "../store/hooks";
import { selectUser } from "../store/reducers/auth";

const useApiClient = () => {
  const user = useAppSelector(selectUser);

  const config = {
    apiKey: user ? user?.accessToken : "",
    basePath: import.meta.env.VITE_APP_API_URL,
  };

  const client = new ApiClient(config);

  return client;
};

export default useApiClient;
