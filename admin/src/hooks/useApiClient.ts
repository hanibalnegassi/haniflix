import ApiClient from '@api/client/src';
import { selectUser } from 'src/store/reducers/auth';
import { useAppSelector } from 'src/store/hooks';

const useApiClient = () => {
  const user = useAppSelector(selectUser);

  const config = {
    apiKey: user ? user?.accessToken : '',
    basePath: import.meta.env.VITE_BASE_API_URL
  };

  const client = new ApiClient(config);

  return client;
};

export default useApiClient;
