import { makeAutoObservable } from "mobx";
import { LoginUser, RegisterUser, UpdateUserData, User } from "../models/user";
import apiClient from "../services/api";


class UserStore {
  user: User | null = null;
  token: string | null = localStorage.getItem('token');
  isLoading = false;
  error: any = null;

  constructor() {
    makeAutoObservable(this);
  }

  login = async (data: LoginUser) => {
    try {
      this.isLoading = true;
      const response = await apiClient.post("/login", data);
      this.token = response.data.token;
      localStorage.setItem('token', this.token!);
      this.fetchUser();
    } catch (error) {
      this.error = error;
      console.error('Error in loginUser service:', error);
    } finally {
      this.isLoading = false;
    }
  };

  register = async (data: RegisterUser) => {
    try {
      const response = await apiClient.post("/register", data);
      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  logout = () => {
    this.user = null;
    this.token = null;
    localStorage.removeItem('token');
  };

  updateUser = async (data: UpdateUserData) => {
    if (!this.token) throw new Error('Token not found');
    try {
      await apiClient.put('/users', data, {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      });
      this.fetchUser();
    } catch (error) {
      console.error('Update user error:', error);
      throw error;
    }
  };

  fetchUser = async () => {
    if (!this.token) throw new Error('No token found');
    try {
      const response = await apiClient.get<User>("/usersdata", {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      });
      this.user = response.data;
    } catch (error) {
      console.error('Fetch user error:', error);
      throw error;
    }
  }
}

export const userStore = new UserStore();
