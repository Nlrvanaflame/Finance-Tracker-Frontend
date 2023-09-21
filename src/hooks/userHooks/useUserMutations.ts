import {  useMutation } from 'react-query';
import { registerUser, loginUser, logoutUser, updateUser } from '../../services/routes';
import queryClient from '../..';
import { LoginUser } from '../../models/user';


export const useRegisterUser = () => {
  return useMutation(registerUser, {
    onSuccess: () => {
      queryClient.invalidateQueries('user');
    },
  });
};

export const useLoginUser = () => {
  return useMutation(loginUser, {
    onSuccess: () => {
      queryClient.invalidateQueries('user');
    },
  });
};

export const useUpdateUser = () => {
  return useMutation((data: { id: string; data: Partial<LoginUser> }) => updateUser(data.id, data.data), {
    onSuccess: () => {
      queryClient.invalidateQueries('user');
    },
  });
}

export const useLogoutUser = () => {
    return useMutation(logoutUser, {
      onSuccess: () => {
        queryClient.invalidateQueries('user');
        // Optionally clear user-related data from the local state or Redux store (if used)
        // e.g., dispatch(logoutAction()) 
      },
    });
  };
  
