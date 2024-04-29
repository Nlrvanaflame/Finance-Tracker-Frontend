import { makeAutoObservable } from "mobx";
import apiClient from "../services/api";
import { FinancialRecord, NewFinancialRecord, updateRecord } from "../models/financialRecord";


class FinancialStore {
  records: FinancialRecord[] = [];
  isLoading = false;
  error: any = null;

  constructor() {
    makeAutoObservable(this);
  }

  fetchRecords = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error("No authentication token found");
      throw new Error("No authentication token found");
    }
    
    try {
      const response = await apiClient.get<FinancialRecord[]>('/records', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      this.records = response.data;
    } catch (error) {
      this.error = error;
    } 
  };

  createRecord = async (data: NewFinancialRecord) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error("No authentication token found");
    
    try {
      await apiClient.post('/records', data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      this.fetchRecords();
    } catch (error) {
      console.error("Create record error:", error);
      throw error;
    }
  };

  updateRecord = async (id: string, data: updateRecord) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error("No authentication token found");
    
    try {
      await apiClient.put(`/records/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      this.fetchRecords();
    } catch (error) {
      console.error("Update record error:", error);
      throw error;
    }
  };

  deleteRecord = async (id: string) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error("No authentication token found");
    
    try {
      await apiClient.delete(`/records/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      this.fetchRecords();
    } catch (error) {
      console.error("Delete record error:", error);
      throw error;
    }
  };
}

export const financialStore = new FinancialStore();
