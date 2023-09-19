import React from 'react'

const dummyData = {
  totalIncome: 5000,
  totalExpenses: 3000,
  balance: 2000,
  incomeVsExpenses: [
    { name: 'Income', value: 5000 },
    { name: 'Expenses', value: 3000 }
  ]
}

const Dashboard: React.FC = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        <h2>Financial Overview</h2>
        <p>Total Income: ${dummyData.totalIncome}</p>
        <p>Total Expenses: ${dummyData.totalExpenses}</p>
        <p>Balance: ${dummyData.balance}</p>

        <div>
          <h3>Income vs Expenses</h3>
          {dummyData.incomeVsExpenses.map((item, index) => (
            <p key={index}>
              {item.name}: ${item.value}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
