import {
  recordListContainerStyle,
  recordStyle
} from '../styles/RecordManagementStyles/RecordListStyle'
import { RecordListProps } from '../types/RecordListType'
import Record from './Record'

const RecordList: React.FC<RecordListProps> = ({ records, onEdit, onDelete }) => {
  return (
    <div style={recordListContainerStyle}>
      {records.map((record) => (
        <Record key={record.id} record={record} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  )
}

export default RecordList
