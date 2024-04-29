import React, { useEffect } from 'react';
import { Chart } from 'chart.js'
import { observer } from 'mobx-react-lite';
import { Link, useNavigate } from 'react-router-dom';
import { financialStore } from '../stores/financialRecordStore';
import { userStore } from '../stores/userStore';
import { PieController, ArcElement, Tooltip, Title } from 'chart.js'
import PieChart from './pieChart';

Chart.register(PieController, ArcElement, Tooltip, Title)
const Dashboard: React.FC = observer(() => {

  
  const navigate = useNavigate();

  useEffect(() => {
    if (!userStore.user) {
      navigate('/login');
    }
    financialStore.fetchRecords();
  }, []);

  if (financialStore.isLoading) return <div>Loading...</div>;
  if (!financialStore.records) return <div>No records found.</div>;

  const incomeRecords = financialStore.records.filter(record => record.type === 'income');
  const expenseRecords = financialStore.records.filter(record => record.type === 'expense');

  const totalIncome = incomeRecords.reduce((sum, record) => sum + record.amount, 0);
  const totalExpenses = expenseRecords.reduce((sum, record) => sum + record.amount, 0);
  const balance = totalIncome - totalExpenses;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#4d5b7a', fontFamily: 'Arial, sans-serif', color: 'navy', alignItems: 'center' }}>
      <Link to="/" style={{ position: 'absolute', top: '20px', left: '20px', fontSize: '2em', color: '#dcdde0', textDecoration: 'none' }}>←</Link>
      <h1 style={{ padding: '45px', color: 'white', fontWeight: 'bold', fontSize: '3em' }}>Dashboard</h1>
      <div style={{ display: 'flex', backgroundColor: 'white', borderRadius: '8px', padding: '20px', margin: '20px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', width: '65%', color: 'black' }}>
        <div style={{ flex: 1, fontSize: '1.6em' }}>
          <h2 style={{ fontWeight: 'bold', color: 'black' }}>Financial Overview</h2>
          <p>Total Income: <span style={{ color: 'black', fontWeight: 'bold' }}>${totalIncome}</span></p>
          <p>Total Expenses: <span style={{ color: 'black', fontWeight: 'bold' }}>${totalExpenses}</span></p>
          <p>Balance: <span style={{ color: 'black', fontWeight: 'bold' }}>${balance}</span></p>
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h3 style={{ fontWeight: 'normal', color: 'black', fontSize: '1.5em' }}>Income vs Expenses</h3>
          <PieChart totalIncome={totalIncome} totalExpenses={totalExpenses} />
        </div>
      </div>
    </div>
  );
});

export default Dashboard;
