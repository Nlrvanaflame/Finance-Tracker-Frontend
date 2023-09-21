import { FinancialRecord, updateRecord } from "../../models/financialRecord"
import api from "../api"

export const getRecords = () => api.get<FinancialRecord[]>('/records')
export const createRecord = (data:FinancialRecord) => api.post('/records',data)
export const editRecord = (id:string ,data: updateRecord)=> api.put(`records/${id}`)
export const deleteRecord = (id:string)=> api.delete(`/records/${id}`)