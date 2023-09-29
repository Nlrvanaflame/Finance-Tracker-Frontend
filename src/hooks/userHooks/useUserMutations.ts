import {  useMutation, useQueryClient } from 'react-query';
import { registerUser, loginUser, logoutUser, updateUser } from '../../services/routes';
import queryClient from '../..';
import { UpdateUserData } from '../../models/user';


export const useRegisterUser = () => {
  return useMutation(registerUser, {
    onSuccess: () => {
      queryClient.invalidateQueries('user');
    },
  });
};

export const useLoginUser = () => {
  const queryClient = useQueryClient();

  return useMutation(loginUser, {
    onSuccess: async(data: any) => {
      if (data?.token) {
        localStorage.setItem('token', data.token);  // Save token to localStorage
        queryClient.invalidateQueries('user');  // Invalidate user query to refetch the user data
      } else {
        console.error('Token not received');
      }
    },
  });
};




export const useUpdateUser = () => {
  return useMutation(
    (data: UpdateUserData) => 
      updateUser(data), 
    {
      onSuccess: () => {
        queryClient.invalidateQueries('user');
      },
    }
  );
};


export const useLogoutUser = () => {
    return useMutation(logoutUser, {
      onSuccess: () => {
        queryClient.invalidateQueries('user');
        // Optionally clear user-related data from the local state or Redux store (if used)
        // e.g., dispatch(logoutAction()) 
      },
    });
  };
  
