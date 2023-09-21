import React from 'react'
import { Chart } from 'chart.js'
import { PieController, ArcElement, Tooltip, Title } from 'chart.js'
import { Pie } from 'react-chartjs-2'

Chart.register(PieController, ArcElement, Tooltip, Title)

const dummyData = {
  totalIncome: 5000,
  totalExpenses: 3000,
  balance: 2000,
  incomeVsExpenses: [
    { name: 'Income', value: 5000 },
    { name: 'Expenses', value: 3000 }
  ]
}

const data = {
  labels: ['Income', 'Expenses'],
  datasets: [
    {
      data: [dummyData.totalIncome, dummyData.totalExpenses],
      backgroundColor: ['#BFD4DB', '#a18fbf'],
      hoverBackgroundColor: ['#BFD4DB', '#a18fbf']
    }
  ]
}

const Dashboard: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: '#4d5b7a',
        fontFamily: 'Arial, sans-serif',
        color: 'navy',
        alignItems: 'center'
      }}
    >
      <h1 style={{ padding: '45px', color: '#dcdde0', fontWeight: 'bold', fontSize: '3em' }}>
        Dashboard
      </h1>
      <div
        style={{
          display: 'flex',
          backgroundColor: '#f5f6fa',
          borderRadius: '8px',
          padding: '20px',
          margin: '20px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
          width: '65%', // Increase width to cover more of the page
          color: '#35455D' // Adjust text color to white for better visibility on navy background
        }}
      >
        <div style={{ flex: 1, fontSize: '1.6em' }}>
          <h2 style={{ fontWeight: 'bold', color: '#35455D' }}>Financial Overview</h2>
          <p>
            Total Income:{' '}
            <span style={{ color: '#35455D', fontWeight: 'bold' }}>${dummyData.totalIncome}</span>
          </p>
          <p>
            Total Expenses:{' '}
            <span style={{ color: '#35455D', fontWeight: 'bold' }}>${dummyData.totalExpenses}</span>
          </p>
          <p>
            Balance:{' '}
            <span style={{ color: '#35455D', fontWeight: 'bold' }}>${dummyData.balance}</span>
          </p>
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h3 style={{ fontWeight: 'bold', color: '#35455D' }}>Income vs Expenses</h3>
          <Pie data={data} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
