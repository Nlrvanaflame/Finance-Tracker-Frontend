import api from "../api"
import { LoginUser, RegisterUser, UpdateUserData, User } from "../../models/user";


export const registerUser = (data:RegisterUser) => api.post("/register",data)
export const loginUser = (data: LoginUser) => {
  return api.post("/login", data)
    .then(response => {
      if (response?.data?.token) {
        return response.data;
      } else {
        throw new Error('Token not found in response');
      }
    })
    .catch(error => {
      console.error('Error in loginUser service:', error);
    });
}

export const logoutUser = ()=> api.get<User>("/logout")


export const updateUser = (data: UpdateUserData) => {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('Token not found');
  }

  

  return api.put(`/users`, data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

export const getUserFromToken = async () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      console.error("No authentication token found");
      throw new Error("No authentication token found");
    }
    
    try {
      const response = await api.get<User>("/usersdata", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('API Response:', response); 
      return response.data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }
  