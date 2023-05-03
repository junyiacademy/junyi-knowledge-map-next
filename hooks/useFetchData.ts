import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const getCsvDataKey = 'getUserProgressCacheEndpoint';

const fetchData = async (filePath: string) => {
  const dropBoxEndpoint = 'https://dl.dropbox.com/s';
  const response = await axios.get(`${dropBoxEndpoint}${filePath}`);
  return response.data;
};

export default function useFetchData(filePath: string) {
  return useQuery({
    queryKey: [getCsvDataKey, filePath],
    queryFn: () => fetchData(filePath),
  });
}
