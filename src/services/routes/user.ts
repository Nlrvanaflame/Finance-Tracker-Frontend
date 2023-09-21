import api from "../api"
import { LoginUser, User } from "../../models/user";


export const registerUser = (data:User) => api.post("/register",data)
export const loginUser = (data:LoginUser)=> api.post("/login",data)
export const logoutUser = ()=> api.get<User>("/logout")
export const updateUser =(id:string, data: 'email'|'hashed_password')=> api.put(`/users/${id}`,data)