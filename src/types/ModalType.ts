import { RecordType } from "./FinancialRecordType";

export type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    record: RecordType;
    handleEditRecord: (id: string, values: RecordType, resetForm: Function) => void;
  };