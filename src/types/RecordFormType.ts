import { Record } from "./FinancialRecordType"

export interface RecordFormProps {
    initialValues: {
      id?: string;
      type: "income" | "expense"
      amount: number
      description: string
    }
     onSubmit: (values: Record, resetForm: Function, id?: string) => void;
    isSubmitting: boolean
  }
  