import { FinancialRecord, NewFinancialRecord, updateRecord } from "../../models/financialRecord"
import api from "../api"

export const getRecords = () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      console.error("No authentication token found");
      throw new Error("No authentication token found");
    }
  
    return api.get<FinancialRecord[]>('/records', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  



  export const createRecord = (data: NewFinancialRecord) => {
    const token = localStorage.getItem('token');
  
    if (!token) {
      console.error("No authentication token found");
      throw new Error("No authentication token found");
    }
  
    return api.post('/records', data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  


  export const editRecord = (id: string, data: updateRecord) => {
    const token = localStorage.getItem('token');
  
    if (!token) {
      console.error("No authentication token found");
      throw new Error("No authentication token found");
    }
  
    return api.put(`records/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  



  export const deleteRecord = (id: string) => {
    const token = localStorage.getItem('token');
  
    if (!token) {
      console.error("No authentication token found");
      throw new Error("No authentication token found");
    }
  
    return api.delete(`/records/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  