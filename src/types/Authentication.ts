import { User } from "../models/user";

export interface AuthResponse {
    user: User;
    token: string;
  }