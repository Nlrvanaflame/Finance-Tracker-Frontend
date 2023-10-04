import React from 'react'
import { Pie } from 'react-chartjs-2'

interface PieChartProps {
  totalIncome: number
  totalExpenses: number
}

const PieChart: React.FC<PieChartProps> = ({ totalIncome, totalExpenses }) => {
  const pieData = {
    labels: ['Income', 'Expenses'],
    datasets: [
      {
        data: [totalIncome, totalExpenses],
        backgroundColor: ['#35455D', '#5D3635'],
        hoverBackgroundColor: ['#35455D', '#5D3635']
      }
    ]
  }

  return <Pie data={pieData} />
}

export default PieChart
