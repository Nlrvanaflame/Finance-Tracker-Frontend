import { RecordType } from "./FinancialRecordType"

export interface RecordListProps {
    records: Array<{
      id: string
      type: string
      amount: number
      description: string
      record_date: string
    }>
    onEdit: (record: RecordType) => void
    onDelete: (recordId: string) => void
  }