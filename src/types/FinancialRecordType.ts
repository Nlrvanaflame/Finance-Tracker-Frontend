export interface RecordType {
  id: string;
  type: string;
  amount: number;
  description: string;
  record_date:  Date;
}


export interface RecordProps {
    record: {
      id: string
      type: string
      amount: number
      description: string
      record_date: Date
    }
    onEdit: (record: RecordType) => void
    onDelete: (recordId: string) => void
  }


export interface Record {
    type: string; 
    amount: number; 
    description: string;
}


  