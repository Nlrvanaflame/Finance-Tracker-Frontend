import { useQuery } from 'react-query';
import { getUserFromToken } from '../../services/routes';

export const useUser = () => {
  return useQuery('user', getUserFromToken, {
    retry: false, 
    staleTime: Infinity,  
  });
};