import { formatDate } from "./dateFormat";


export const isMatch = (record: any, filter: { date: string; type: string; amount: string }) => {
    const isDateMatch =
      !filter.date || (record.record_date && formatDate(record.record_date) === filter.date)
    const isTypeMatch = !filter.type || record.type.includes(filter.type)
    const isAmountMatch = !filter.amount || record.amount.toString().includes(filter.amount)
  
    return isDateMatch && isTypeMatch && isAmountMatch
  }