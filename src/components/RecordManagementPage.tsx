import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import RecordList from '../utilComponents/recordList'
import RecordFilter from '../utilComponents/recordFilter'
import RecordForm from '../utilComponents/recordForm'
import { Record, RecordType } from '../types/FinancialRecordType'
import { mainContainerStyle } from '../styles/RecordManagementStyles/MainContainerStyle'
import { backArrowStyle } from '../styles/RecordManagementStyles/BackArrowStyle'
import { headerStyle } from '../styles/RecordManagementStyles/HeaderStyle'
import { formsContainerStyle } from '../styles/RecordManagementStyles/formsContainerStyle'
import { isMatch } from '../utilFunctions/match'
import Modal from '../utilComponents/Modal'
import { useCreateRecordMutation, useDeleteRecordMutation, useEditRecordMutation, useGetRecordsQuery, useGetUserFromTokenQuery } from '../services/api'

const RecordManagementPage: React.FC = () => {
  const { data: records, isLoading, isError } = useGetRecordsQuery();
  const { data: user, isLoading: isUserLoading } = useGetUserFromTokenQuery();
  const [createRecord] = useCreateRecordMutation();
  const [editRecord] = useEditRecordMutation();
  const [deleteRecord] = useDeleteRecordMutation();


  const [isModalOpen, setIsModalOpen] = useState(false)

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

  

  const handleAddRecord = (values: Record, resetForm: Function) => {
    if (user && user.id) {

      const newRecord = {
        ...values,
        user_id: user.id,
        record_date: new Date()
    };
      createRecord(newRecord);
      resetForm();
    }
  };

  const handleEditRecord = (record: RecordType) => {
    if (record.id && user && user.id) {
      const updateData = {
        user_id: user.id,
        type: record.type as 'income' | 'expense',
        amount: record.amount,
        description: record.description,
        record_date: record.record_date
      };
      editRecord({ id: record.id, data: updateData });
    }
  };
  

  const handleDeleteRecord = (id: string) => {
    deleteRecord(id);
  };


  const handleEditClick = (record: any) => {
    setEditingRecord(record)
    setIsModalOpen(true)
  }

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFilter({ ...filter, [name]: value })
  }

  const filteredRecords = records!.filter((record) => isMatch(record, filter))

  const formattedRecords = filteredRecords.map((record) => {
    return {
      ...record,
      record_date: record.record_date
    }
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError || !records || !user?.id) {
    return <div>Error loading data. Please try again later.</div>
  }

  return (
    <div style={mainContainerStyle}>
      <Link style={backArrowStyle} to="/">
        ←
      </Link>
      <h1 style={headerStyle}>Record Management</h1>

      <div style={formsContainerStyle}>
        <RecordForm
          initialValues={{ id: undefined, type: "expense", amount: 0, description: '' }}
          onSubmit={handleAddRecord}
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
        handleEditRecord={(id, values, resetForm) => handleEditRecord({ ...values })}
      />
    </div>
  )
}

export default RecordManagementPage
