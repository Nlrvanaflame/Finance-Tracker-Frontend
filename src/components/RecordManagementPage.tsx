import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import { useGetRecord } from '../hooks/financeHooks/useGetRecord'
import { useFinanceMutations } from '../hooks/financeHooks/useRecordMutations'
import { useUser } from '../hooks/userHooks/useGetUser'
import { format } from 'date-fns'
import RecordList from '../utilComponents/recordList'
import RecordFilter from '../utilComponents/recordFilter'
import RecordForm from '../utilComponents/recordForm'
import { Record } from '../types/FinancialRecordType'
import { mainContainerStyle } from '../styles/RecordManagementStyles/MainContainerStyle'
import { backArrowStyle } from '../styles/RecordManagementStyles/BackArrowStyle'
import { headerStyle } from '../styles/RecordManagementStyles/HeaderStyle'

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

  const handleAddRecord = (values: Record, resetForm: Function) => {
    if (user && user.id) {
      createRecord.mutate({
        user_id: user.id,
        type: values.type as 'income' | 'expense',
        amount: parseFloat(values.amount),
        description: values.description,
        record_date: new Date()
      })

      resetForm()

      setEditMode(false)
      setEditingRecord(null)
    }
  }

  const handleEditRecord = (id: string, values: Record, resetForm: Function) => {
    if (user && user.id) {
      editRecord.mutate({
        id,
        data: {
          user_id: user.id,
          type: values.type as 'income' | 'expense',
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

  const formattedRecords = filteredRecords.map((record) => {
    return {
      ...record,
      record_date:
        record.record_date && !isNaN(new Date(record.record_date).getTime())
          ? format(new Date(record.record_date), 'yyyy-MM-dd')
          : 'Invalid Date'
    }
  })

  return (
    <div style={mainContainerStyle}>
      <Link style={backArrowStyle} to="/">
        ←
      </Link>
      <h1 style={headerStyle}>Record Management</h1>

      <RecordForm
        initialValues={editMode ? editingRecord : { type: '', amount: '', description: '' }}
        onSubmit={(values, resetForm) =>
          editMode
            ? handleEditRecord(editingRecord.id, values, resetForm)
            : handleAddRecord(values, resetForm)
        }
        isEditMode={editMode}
        isSubmitting={false}
      />

      <RecordFilter filter={filter} onFilterChange={handleFilterChange} />

      <RecordList
        records={formattedRecords}
        onEdit={handleEditClick}
        onDelete={handleDeleteRecord}
      />
    </div>
  )
}

export default RecordManagementPage
