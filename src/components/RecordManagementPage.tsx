import React, { useState } from 'react'

interface Record {
  id: number
  date: string
  type: string
  amount: number
}

const RecordManagementPage: React.FC = () => {
  const [records, setRecords] = useState<Record[]>([
    { id: 1, date: '2023-09-01', type: 'Income', amount: 1000 },
    { id: 2, date: '2023-09-05', type: 'Expense', amount: 500 }
  ])

  const [formState, setFormState] = useState({ date: '', type: '', amount: '' })
  const [filter, setFilter] = useState({ date: '', type: '', amount: '' })
  const [editMode, setEditMode] = useState(false)
  const [currentRecordId, setCurrentRecordId] = useState<number | null>(null)

  const handleAddRecord = () => {
    const currentDate = new Date()
    const formattedDate = `${currentDate.getFullYear()}-${String(
      currentDate.getMonth() + 1
    ).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`

    const newRecord: Record = {
      id: records.length + 1,
      date: formattedDate,
      type: formState.type,
      amount: parseFloat(formState.amount)
    }

    if (newRecord.amount > 0) {
      setRecords([...records, newRecord])
      setFormState({ date: '', type: '', amount: '' })
    } else {
      alert('Amount must be positive')
    }
  }

  const handleEditRecord = () => {
    const newRecords = records.map((record) => {
      if (record.id === currentRecordId) {
        return { ...record, ...formState, amount: parseFloat(formState.amount) }
      }
      return record
    })
    setRecords(newRecords)
    setEditMode(false)
    setCurrentRecordId(null)
    setFormState({ date: '', type: '', amount: '' })
  }

  const handleDeleteRecord = (id: number) => {
    setRecords(records.filter((record) => record.id !== id))
  }

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFilter({ ...filter, [name]: value })
  }

  const handleEditClick = (record: Record) => {
    setFormState({ ...record, amount: record.amount.toString() })
    setEditMode(true)
    setCurrentRecordId(record.id)
  }

  const filteredRecords = records.filter((record) => {
    return (
      (filter.date === '' || record.date.includes(filter.date)) &&
      (filter.type === '' || record.type.includes(filter.type)) &&
      (filter.amount === '' || record.amount.toString().includes(filter.amount))
    )
  })

  return (
    <div style={{ backgroundColor: '#35455D', color: '#dcdde0', padding: '20px' }}>
      <h1 style={{ color: '#dcdde0', textAlign: 'center', fontSize: '2em' }}>Record Management</h1>
      <div
        style={{
          backgroundColor: '#4d5b7a',
          padding: '20px',
          borderRadius: '8px',
          margin: '20px 0'
        }}
      >
        <h2 style={{ color: '#dcdde0' }}>Add New Record</h2>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ marginRight: '10px', color: '#dcdde0' }}>Type: </label>
          <select
            value={formState.type}
            onChange={(e) => setFormState({ ...formState, type: e.target.value })}
            style={{ padding: '5px', color: '#35455D' }}
          >
            <option value="">Select Type</option>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ marginRight: '10px', color: '#dcdde0' }}>Amount: </label>
          <input
            type="number"
            value={formState.amount}
            onChange={(e) => setFormState({ ...formState, amount: e.target.value })}
            style={{ padding: '5px', color: '#35455D' }}
          />
        </div>
        <button
          onClick={editMode ? handleEditRecord : handleAddRecord}
          style={{
            padding: '5px',
            backgroundColor: '#35455D',
            color: '#dcdde0',
            border: 'none',
            borderRadius: '4px'
          }}
        >
          {editMode ? 'Edit Record' : 'Add Record'}
        </button>
      </div>
      <div
        style={{
          backgroundColor: '#4d5b7a',
          padding: '20px',
          borderRadius: '8px',
          margin: '20px 0'
        }}
      >
        <h2 style={{ color: '#dcdde0' }}>Filter Records</h2>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ marginRight: '10px', color: '#dcdde0' }}>Date: </label>
          <input
            type="date"
            name="date"
            value={filter.date}
            onChange={handleFilterChange}
            style={{ padding: '5px', color: '#35455D' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ marginRight: '10px', color: '#dcdde0' }}>Type: </label>
          <select
            name="type"
            value={filter.type}
            onChange={handleFilterChange}
            style={{ padding: '5px', color: '#35455D' }}
          >
            <option value="">All</option>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ marginRight: '10px', color: '#dcdde0' }}>Amount: </label>
          <input
            type="number"
            name="amount"
            value={filter.amount}
            onChange={handleFilterChange}
            style={{ padding: '5px', color: '#35455D' }}
          />
        </div>
      </div>
      <div style={{ backgroundColor: '#4d5b7a', padding: '20px', borderRadius: '8px' }}>
        <h2 style={{ color: '#dcdde0' }}>Record List</h2>
        <table style={{ width: '100%', marginBottom: '20px' }}>
          <thead>
            <tr>
              <th style={{ minWidth: '150px', textAlign: 'left' }}>Date</th>
              <th style={{ minWidth: '150px', textAlign: 'left' }}>Type</th>
              <th style={{ minWidth: '150px', textAlign: 'left' }}>Amount</th>
              <th style={{ minWidth: '200px', textAlign: 'left' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.map((record) => (
              <tr key={record.id}>
                <td style={{ minWidth: '150px', textAlign: 'left' }}>{record.date}</td>
                <td style={{ minWidth: '150px', textAlign: 'left' }}>{record.type}</td>
                <td style={{ minWidth: '150px', textAlign: 'left' }}>${record.amount}</td>
                <td style={{ minWidth: '200px', textAlign: 'left' }}>
                  <button onClick={() => handleEditClick(record)} style={{ marginRight: '10px' }}>
                    Edit
                  </button>
                  <button onClick={() => handleDeleteRecord(record.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default RecordManagementPage
