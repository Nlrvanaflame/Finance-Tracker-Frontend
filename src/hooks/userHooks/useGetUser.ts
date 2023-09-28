import { useQuery } from 'react-query';
import { getUserByUsername } from '../../services/routes';

export const useUser = (username:string) => {
  return useQuery(['user', username], () => getUserByUsername(username), {
    enabled: !!username,  // This query will not run until the username exists
  });
};
