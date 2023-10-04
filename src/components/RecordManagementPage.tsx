import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import { useGetRecord } from '../hooks/financeHooks/useGetRecord'
import { useFinanceMutations } from '../hooks/financeHooks/useRecordMutations'
import { useUser } from '../hooks/userHooks/useGetUser'
import { format } from 'date-fns'

const RecordManagementPage: React.FC = () => {
  const { data: recordsResponse, isLoading, isError } = useGetRecord()
  const { data: user, isLoading: isUserLoading } = useUser()
  const createRecord = useFinanceMutations().useCreateRecord()
  const editRecord = useFinanceMutations().useEditRecord()
  const deleteRecord = useFinanceMutations().useDeleteRecord()

  const [editMode, setEditMode] = useState(false)
  const [editingRecord, setEditingRecord] = useState<any>(null)

  const [filter, setFilter] = useState({
    date: '',
    type: '',
    amount: ''
  })
  const navigate = useNavigate()

  useEffect(() => {
    if (!isUserLoading && !user) {
      navigate('/login')
    }
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError || !recordsResponse || !user?.id) {
    return <div>Error loading data. Please try again later.</div>
  }
  const records = recordsResponse.data

  const handleAddRecord = (values: any, resetForm: Function) => {
    if (user && user.id) {
      createRecord.mutate({
        user_id: user.id,
        type: values.type,
        amount: parseFloat(values.amount),
        description: values.description,
        record_date: new Date()
      })

      resetForm()

      setEditMode(false)
      setEditingRecord(null)
    }
  }

  const handleEditRecord = (id: string, values: any, resetForm: Function) => {
    if (user && user.id) {
      editRecord.mutate({
        id,
        data: {
          user_id: user.id,
          type: values.type,
          amount: parseFloat(values.amount),
          description: values.description
        }
      })
      resetForm()
    }
  }

  const handleDeleteRecord = (id: string) => {
    deleteRecord.mutate(id)
  }

  const handleEditClick = (record: any) => {
    setEditMode(true)
    setEditingRecord(record)
  }

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFilter({ ...filter, [name]: value })
  }

  const isMatch = (record: any, filter: { date: string; type: string; amount: string }) => {
    const isDateMatch =
      !filter.date ||
      (record.record_date && format(new Date(record.record_date), 'yyyy-MM-dd') === filter.date)
    const isTypeMatch = !filter.type || record.type.includes(filter.type)
    const isAmountMatch = !filter.amount || record.amount.toString().includes(filter.amount)

    return isDateMatch && isTypeMatch && isAmountMatch
  }

  const filteredRecords = records.filter((record) => isMatch(record, filter))

  const formatDate = (dateString: Date) => {
    try {
      return format(new Date(dateString), 'yyyy-MM-dd')
    } catch (error) {
      console.error('Error formatting date:', error)
      return ''
    }
  }

  return (
    <div
      style={{ backgroundColor: '#35455D', color: '#dcdde0', minHeight: '100vh', padding: '20px' }}
    >
      <Link
        to="/"
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          fontSize: '2em',
          color: '#dcdde0',
          textDecoration: 'none'
        }}
      >
        ←
      </Link>

      <h1 style={{ color: 'white', textAlign: 'center', fontSize: '2em' }}>Record Management</h1>

      <Formik
        initialValues={editMode ? editingRecord : { type: '', amount: '', description: '' }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          editMode
            ? handleEditRecord(editingRecord.id, values, resetForm)
            : handleAddRecord(values, resetForm)
          setSubmitting(false)
        }}
      >
        {({ isSubmitting }) => (
          <Form
            style={{
              backgroundColor: '#4d5b7a',
              padding: '20px',
              borderRadius: '8px',
              margin: '20px 0'
            }}
          >
            <h2 style={{ color: 'white' }}>Add New Record</h2>

            <div style={{ marginBottom: '10px' }}>
              <label style={{ marginRight: '10px', color: 'white' }}>Type: </label>
              <Field as="select" name="type" style={{ padding: '5px', color: '#35455D' }}>
                <option value="" label="Select type" />
                <option value="income" label="Income" />
                <option value="expense" label="Expense" />
              </Field>
            </div>

            <div style={{ marginBottom: '10px' }}>
              <label style={{ marginRight: '10px', color: 'white' }}>Amount: </label>
              <Field name="amount" type="number" style={{ padding: '5px', color: '#35455D' }} />
            </div>

            <div style={{ marginBottom: '10px' }}>
              <label style={{ marginRight: '10px', color: 'white' }}>Description: </label>
              <Field name="description" type="text" style={{ padding: '5px', color: '#35455D' }} />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                padding: '10px 20px',
                borderRadius: '5px',
                border: 'none',
                color: '#fff',
                backgroundColor: '#405a94'
              }}
            >
              {editMode ? 'Edit Record' : 'Add Record'}
            </button>
          </Form>
        )}
      </Formik>

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
          <label style={{ marginRight: '10px', color: 'white' }}>Date: </label>
          <input
            type="date"
            name="date"
            value={filter.date}
            onChange={handleFilterChange}
            style={{ padding: '5px', color: '#35455D' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label style={{ marginRight: '10px', color: 'white' }}>Type: </label>
          <select
            name="type"
            value={filter.type}
            onChange={handleFilterChange}
            style={{ padding: '5px', color: '#35455D' }}
          >
            <option value="">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label style={{ marginRight: '10px', color: 'white' }}>Amount: </label>
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

        {filteredRecords && filteredRecords.length > 0 ? (
          filteredRecords.map((record) => {
            let formattedDate = ''
            try {
              if (record.record_date) {
                formattedDate = format(new Date(record.record_date), 'yyyy-MM-dd')
              }
            } catch (error) {
              console.error('Error formatting date:', error)
            }

            return (
              <div
                key={record.id}
                style={{
                  padding: '10px',
                  backgroundColor: '#5a678a',
                  borderRadius: '5px',
                  margin: '10px 0',
                  color: 'white'
                }}
              >
                <p>
                  <strong>Type:</strong> {record.type}
                </p>
                <p>
                  <strong>Amount:</strong> {record.amount}
                </p>
                <p>
                  <strong>Description:</strong> {record.description}
                </p>
                {formattedDate && (
                  <p>
                    <strong>Date:</strong> {formattedDate}
                  </p>
                )}
                <div style={{ display: 'flex', gap: '4px' }}>
                  <button
                    onClick={() => handleEditClick(record)}
                    style={{
                      backgroundColor: '#405a94',
                      color: 'white',
                      border: 'none',
                      padding: '5px 10px',
                      borderRadius: '4px'
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteRecord(record.id)}
                    style={{
                      backgroundColor: '#405a94',
                      color: 'white',
                      border: 'none',
                      padding: '5px 10px',
                      borderRadius: '4px'
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )
          })
        ) : (
          <p>No records available.</p>
        )}
      </div>
    </div>
  )
}

export default RecordManagementPage
