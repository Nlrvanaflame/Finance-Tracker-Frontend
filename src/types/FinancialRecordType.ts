export interface RecordType {
  id: string;
  type: string;
  amount: number;
  description: string;
  record_date:  string;
}


export interface RecordProps {
    record: {
      id: string
      type: string
      amount: number
      description: string
      record_date: string
    }
    onEdit: (record: RecordType) => void
    onDelete: (recordId: string) => void
  }


export interface Record {
    type: string; 
    amount: string; 
    description: string;
}


  