import { format } from 'date-fns'

export const formatDate = (date: Date | string) => {
    if (!date) return 'Invalid Date'
    const dateObj = new Date(date)
    return dateObj && !isNaN(dateObj.getTime()) ? format(dateObj, 'yyyy-MM-dd') : 'Invalid Date'
  }