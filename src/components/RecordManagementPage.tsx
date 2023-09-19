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

  const handleAddRecord = () => {
    const newRecord: Record = {
      id: records.length + 1,
      date: formState.date,
      type: formState.type,
      amount: parseFloat(formState.amount)
    }
    setRecords([...records, newRecord])
  }

  const handleDeleteRecord = (id: number) => {
    setRecords(records.filter((record) => record.id !== id))
  }

  return (
    <div>
      <h1>Record Management</h1>

      <div>
        <h2>Add New Record</h2>
        <div>
          <label>Date: </label>
          <input
            type="date"
            value={formState.date}
            onChange={(e) => setFormState({ ...formState, date: e.target.value })}
          />
        </div>
        <div>
          <label>Type: </label>
          <select
            value={formState.type}
            onChange={(e) => setFormState({ ...formState, type: e.target.value })}
          >
            <option value="">Select Type</option>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
        </div>
        <div>
          <label>Amount: </label>
          <input
            type="number"
            value={formState.amount}
            onChange={(e) => setFormState({ ...formState, amount: e.target.value })}
          />
        </div>
        <button onClick={handleAddRecord}>Add Record</button>
      </div>

      <div>
        <h2>Record List</h2>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record.id}>
                <td>{record.date}</td>
                <td>{record.type}</td>
                <td>${record.amount}</td>
                <td>
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
