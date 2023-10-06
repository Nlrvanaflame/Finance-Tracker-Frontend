import { deleteButtonStyle } from '../styles/RecordManagementStyles/DeleteButtonStyle'
import { editButtonStyle } from '../styles/RecordManagementStyles/EditButtonStyle'
import {
  recordListContainerStyle,
  recordStyle
} from '../styles/RecordManagementStyles/RecordListStyle'
import { buttonsContainerStyle } from '../styles/RecordManagementStyles/buttonsContainerStyles'
import { RecordProps } from '../types/FinancialRecordType'

const Record: React.FC<RecordProps> = ({ record, onEdit, onDelete }) => {
  return (
    <div style={recordStyle}>
      <p style={{ gridArea: 'type' }}>
        <strong>Type:</strong> {record.type}
      </p>
      <p style={{ gridArea: 'amount' }}>
        <strong>Amount:</strong> {record.amount}
      </p>
      <p style={{ gridArea: 'description' }}>
        <strong>Description:</strong> {record.description}
      </p>
      {record.record_date && (
        <p style={{ gridArea: 'date' }}>
          <strong>Date:</strong> {record.record_date}
        </p>
      )}

      <div style={{ gridArea: 'buttons', display: 'flex', justifyContent: 'center' }}>
        <button onClick={() => onEdit(record)} style={editButtonStyle}>
          Edit
        </button>
        <button onClick={() => onDelete(record.id)} style={deleteButtonStyle}>
          Delete
        </button>
      </div>
    </div>
  )
}

export default Record
