import { Record } from "./FinancialRecordType"

export interface RecordFormProps {
    initialValues: {
      id?: string;
      type: string
      amount: number
      description: string
    }
     onSubmit: (values: Record, resetForm: Function, id?: string) => void;
    isSubmitting: boolean
  }
  