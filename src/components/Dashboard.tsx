import React, { useEffect, useState } from 'react';
import { Chart } from 'chart.js'
import { PieController, ArcElement, Tooltip, Title } from 'chart.js'
import { Link, useNavigate } from 'react-router-dom';
import { useGetRecordsQuery, useGetUserFromTokenQuery } from '../services/api';
import PieChart from './pieChart';


Chart.register(PieController, ArcElement, Tooltip, Title)

const Dashboard: React.FC = () => {
  const { data: records, isLoading: recordsLoading } = useGetRecordsQuery();
  const { data: user, isLoading: userLoading } = useGetUserFromTokenQuery();
  const [financialData, setFinancialData] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    balance: 0
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!userLoading && !user) {
      navigate('/login');
    }

    if (!records) return;

    const incomeRecords = records.filter(record => record.type === 'income');
    const expenseRecords = records.filter(record => record.type === 'expense');

    const totalIncome = incomeRecords.reduce((sum, record) => sum + record.amount, 0);
    const totalExpenses = expenseRecords.reduce((sum, record) => sum + record.amount, 0);
    const balance = totalIncome - totalExpenses;

    setFinancialData({ totalIncome, totalExpenses, balance });
  }, [records, user, userLoading, navigate]);

  if (recordsLoading || userLoading) return <div>Loading...</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#4d5b7a', fontFamily: 'Arial, sans-serif', color: 'navy', alignItems: 'center', justifyContent: 'center' }}>
      <Link to="/" style={{ position: 'absolute', top: '20px', left: '20px', fontSize: '2em', color: '#dcdde0', textDecoration: 'none' }}>←</Link>
      <h1 style={{ padding: '45px', color: 'white', fontWeight: 'bold', fontSize: '3em' }}>Dashboard</h1>
      <div style={{ display: 'flex', backgroundColor: 'white', borderRadius: '8px', padding: '20px', margin: '20px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', width: '65%', color: 'black' }}>
        <div style={{ flex: 1, fontSize: '1.6em' }}>
          <h2 style={{ fontWeight: 'bold', color: 'black' }}>Financial Overview</h2>
          <p>Total Income: <span style={{ color: 'black', fontWeight: 'bold' }}>${financialData.totalIncome}</span></p>
          <p>Total Expenses: <span style={{ color: 'black', fontWeight: 'bold' }}>${financialData.totalExpenses}</span></p>
          <p>Balance: <span style={{ color: 'black', fontWeight: 'bold' }}>${financialData.balance}</span></p>
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h3 style={{ fontWeight: 'normal', color: 'black', fontSize: '1.5em' }}>Income vs Expenses</h3>
          <PieChart totalIncome={financialData.totalIncome} totalExpenses={financialData.totalExpenses} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
