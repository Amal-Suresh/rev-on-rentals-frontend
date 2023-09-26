import React from 'react'
import {Pie} from 'react-chartjs-2'
import {Chart as ChartJs} from 'chart.js/auto'

function PieChart({chartData}) {
  return (
    <div>

        <Pie data={chartData}  />
    </div>
  )
}

export default PieChart