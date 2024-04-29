import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
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
import { formsContainerStyle } from '../styles/RecordManagementStyles/formsContainerStyle'
import { isMatch } from '../utilFunctions/match'
import { formatDate } from '../utilFunctions/dateFormat'
import Modal from '../utilComponents/Modal'
import { useAtom } from 'jotai'
import { editingRecordAtom, isModalOpenAtom, recordFilterAtom } from '../states/atoms'

const RecordManagementPage: React.FC = () => {
  const { data: recordsResponse, isLoading, isError } = useGetRecord()
  const { data: user, isLoading: isUserLoading } = useUser()
  const createRecord = useFinanceMutations().useCreateRecord()
  const editRecord = useFinanceMutations().useEditRecord()
  const deleteRecord = useFinanceMutations().useDeleteRecord()

  const [isModalOpen, setIsModalOpen] = useAtom(isModalOpenAtom);
  const [editingRecord, setEditingRecord] = useAtom(editingRecordAtom);
  const [filter, setFilter] = useAtom(recordFilterAtom);
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
        amount: values.amount,
        description: values.description,
        record_date: new Date()
      })

      resetForm()

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
          amount: values.amount,
          description: values.description
        }
      })
      resetForm()
    }
  }

  const handleDeleteRecord = (id: string) => deleteRecord.mutate(id)

  const handleEditClick = (record: any) => {
    setEditingRecord(record)
    setIsModalOpen(true)
  }

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFilter({ ...filter, [name]: value })
  }

  const filteredRecords = records.filter((record) => isMatch(record, filter))

  const formattedRecords = filteredRecords.map((record) => {
    console.log(record.record_date)
    console.log(format(new Date(record.record_date), 'yyyy-MM-dd'))
    return {
      ...record,
      record_date: formatDate(record.record_date)
    }
  })

  return (
    <div style={mainContainerStyle}>
      <Link style={backArrowStyle} to="/">
        ←
      </Link>
      <h1 style={headerStyle}>Record Management</h1>

      <div style={formsContainerStyle}>
        <RecordForm
          initialValues={{ type: '', amount: 0, description: '' }}
          onSubmit={(values, resetForm) => handleAddRecord(values, resetForm)}
          isSubmitting={false}
        />

        <RecordFilter filter={filter} onFilterChange={handleFilterChange} />
      </div>

      <RecordList
        records={formattedRecords}
        onEdit={handleEditClick}
        onDelete={handleDeleteRecord}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        record={editingRecord}
        handleEditRecord={handleEditRecord}
      />
    </div>
  )
}

export default RecordManagementPage
