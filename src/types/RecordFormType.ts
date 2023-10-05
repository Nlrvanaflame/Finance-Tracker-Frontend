import { Record } from "./FinancialRecordType"

export interface RecordFormProps {
    initialValues: {
      id?: string;
      type: string
      amount: string
      description: string
    }
     onSubmit: (values: Record, resetForm: Function, id?: string) => void;
    isEditMode: boolean
    isSubmitting: boolean
  }
  