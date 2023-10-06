import { deleteButtonStyle } from '../styles/RecordManagementStyles/DeleteButtonStyle'
import { editButtonStyle } from '../styles/RecordManagementStyles/EditButtonStyle'
import {
  centeredContentStyle,
  recordListContainerStyle,
  recordStyle
} from '../styles/RecordManagementStyles/RecordListStyle'
import { buttonsContainerStyle } from '../styles/RecordManagementStyles/buttonsContainerStyles'
import { RecordProps } from '../types/FinancialRecordType'

const Record: React.FC<RecordProps> = ({ record, onEdit, onDelete }) => {
  return (
    <div style={recordStyle}>
      <div style={{ ...centeredContentStyle, gridArea: 'type' }}>
        <p>
          <strong>Type:</strong> {record.type}
        </p>
      </div>
      <div style={{ ...centeredContentStyle, gridArea: 'amount' }}>
        <p>
          <strong>Amount:</strong> {record.amount}
        </p>
      </div>
      <div style={{ ...centeredContentStyle, gridArea: 'description' }}>
        <p>
          <strong>Description:</strong> {record.description}
        </p>
      </div>
      {record.record_date && (
        <div style={{ ...centeredContentStyle, gridArea: 'date' }}>
          <p>
            <strong>Date:</strong> {record.record_date}
          </p>
        </div>
      )}

      <div style={{ ...centeredContentStyle, gridArea: 'buttons' }}>
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
