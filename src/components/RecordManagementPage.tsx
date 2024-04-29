import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Link, useNavigate } from 'react-router-dom';

import { userStore } from '../stores/userStore';
import RecordList from '../utilComponents/recordList';
import RecordFilter from '../utilComponents/recordFilter';
import RecordForm from '../utilComponents/recordForm';
import { mainContainerStyle } from '../styles/RecordManagementStyles/MainContainerStyle';
import { backArrowStyle } from '../styles/RecordManagementStyles/BackArrowStyle';
import { headerStyle } from '../styles/RecordManagementStyles/HeaderStyle';
import { formsContainerStyle } from '../styles/RecordManagementStyles/formsContainerStyle';
import { financialStore } from '../stores/financialRecordStore';
import { Record, RecordType } from '../types/FinancialRecordType';
import { updateRecord } from '../models/financialRecord';
import { isMatch } from '../utilFunctions/match';
import { formatDate } from '../utilFunctions/dateFormat';

const RecordManagementPage: React.FC = observer(() => {
  const navigate = useNavigate();
  const [isSubmitting, setSubmitting] = useState(false);

  // Define initial filter state based on the RecordFilterProps
  const [filter, setFilter] = useState({
    date: '',
    type: '',
    amount: ''
  });

  useEffect(() => {
    if (!userStore.user) {
      navigate('/login');
    }
    financialStore.fetchRecords();
  }, []);

  const handleAddRecord = (values: Record, resetForm: Function) => {
    if (!userStore.user?.id) {
        console.error("User ID is undefined.");
        return;
    }
    // Assuming `createRecord` needs a user_id explicitly
    const newRecord = {
        ...values,
        user_id: userStore.user.id
    };
    setSubmitting(true);
    financialStore.createRecord(newRecord as any); // Cast to any if the types are not aligning and need backend adjustments
    resetForm();
    setSubmitting(false);
};

const handleEditRecord = (record: RecordType) => {
  if (!record.id) {
      console.error("Record ID is missing.");
      return;
  }
  if (!userStore.user?.id) {
      console.error("User ID is missing from userStore.");
      return;
  }
  if (record.type !== "income" && record.type !== "expense") {
    console.error("Record type is invalid.");
    return;
}

  const updateData: updateRecord = {
      user_id: userStore.user.id, 
      type: record.type,
      amount: record.amount,
      description: record.description
  };

  // Now call update with the correct type
  financialStore.updateRecord(record.id, updateData);
};



  const handleDeleteRecord = (id: string) => {
    financialStore.deleteRecord(id);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFilter(prev => ({ ...filter, [name]: value }));
  };

  const filteredRecords = financialStore.records.filter((record) => isMatch(record, filter))

  const formattedRecords = filteredRecords.map((record) => {
    return {
      ...record,
      record_date: record.record_date
    }
  })

  if (financialStore.isLoading) return <div>Loading...</div>;
  if (financialStore.error) return <div>Error loading data. Please try again later.</div>;

  return (
    <div style={mainContainerStyle}>
      <Link style={backArrowStyle} to="/">←</Link>
      <h1 style={headerStyle}>Record Management</h1>
      <div style={formsContainerStyle}>
        <RecordForm
          onSubmit={handleAddRecord}
          initialValues={{ id: undefined, type: '', amount: 0, description: '' }}
          isSubmitting={isSubmitting}
        />
        <RecordFilter
          filter={filter}
          onFilterChange={handleFilterChange}
        />
      </div>
      <RecordList
        records={formattedRecords}
        onEdit={handleEditRecord}
        onDelete={handleDeleteRecord}
      />
    </div>
  );
});

export default RecordManagementPage;
