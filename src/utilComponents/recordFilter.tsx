import { filterContainerStyle, filterStyle } from '../styles/RecordManagementStyles/FilterStyle'
import { RecordFilterProps } from '../types/RecordFilter'

const RecordFilter: React.FC<RecordFilterProps> = ({ filter, onFilterChange }) => {
  return (
    <div style={filterContainerStyle}>
      <h2 style={filterStyle.heading}>Filter Records</h2>

      <div style={filterStyle.filterItem}>
        <label style={filterStyle.label}>Date: </label>
        <input
          type="date"
          name="date"
          value={filter.date}
          onChange={onFilterChange}
          style={filterStyle.input}
        />
      </div>

      <div style={filterStyle.filterItem}>
        <label style={filterStyle.label}>Type: </label>
        <select
          name="type"
          value={filter.type}
          onChange={onFilterChange}
          style={filterStyle.select}
        >
          <option value="">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      <div style={filterStyle.filterItem}>
        <label style={filterStyle.label}>Amount: </label>
        <input
          type="number"
          name="amount"
          value={filter.amount}
          onChange={onFilterChange}
          style={filterStyle.input}
        />
      </div>
    </div>
  )
}

export default RecordFilter
