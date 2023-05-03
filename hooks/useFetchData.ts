import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchData = async () => {
  const response = await axios.get(
    'https://dl.dropbox.com/s/gtycnw048vvdqer/output567.csv'
  );
  return response.data;
};

export default function useFetchData() {
  const response = useQuery({
    queryKey: ['getUserProgressCacheEndpoint'],
    queryFn: () => fetchData(),
  });

  return {
    data: response?.data,
    isLoading: response?.isLoading,
    isSuccess: response?.isSuccess,
    refetch: response?.refetch,
  };
}
