import { deleteButtonStyle } from '../styles/RecordManagementStyles/DeleteButtonStyle'
import { editButtonStyle } from '../styles/RecordManagementStyles/EditButtonStyle'
import {
  recordListContainerStyle,
  recordStyle
} from '../styles/RecordManagementStyles/RecordListStyle'
import { RecordProps } from '../types/FinancialRecordType'

const Record: React.FC<RecordProps> = ({ record, onEdit, onDelete }) => {
  return (
    <div style={recordStyle}>
      <p>
        <strong>Type:</strong> {record.type}
      </p>
      <p>
        <strong>Amount:</strong> {record.amount}
      </p>
      <p>
        <strong>Description:</strong> {record.description}
      </p>
      {record.record_date && (
        <p>
          <strong>Date:</strong> {record.record_date}
        </p>
      )}

      <button onClick={() => onEdit(record)} style={editButtonStyle}>
        Edit
      </button>
      <button onClick={() => onDelete(record.id)} style={deleteButtonStyle}>
        Delete
      </button>
    </div>
  )
}

export default Record
