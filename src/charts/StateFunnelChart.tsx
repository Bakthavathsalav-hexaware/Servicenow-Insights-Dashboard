
import ReactECharts from 'echarts-for-react'
import { Paper } from '@mui/material'
 
type FunnelItem = {
  name: string
  value: number
}
 
type Props = {
  data?: FunnelItem[]
}
 
const StateFunnelChart = ({ data = [] }: Props) => {
  // 🔥 Normalize + sort data (VERY IMPORTANT)
  const funnelData = data
    .map(item => ({
      name: item.name,
      value: Number(item.value), // force number
    }))
    .filter(item => item.value > 0)
    .sort((a, b) => b.value - a.value)
 
  if (funnelData.length === 0) {
    return (
      <Paper sx={{ p: 3 }}>
        <p>No state data available</p>
      </Paper>
    )
  }
 
  const option = {
    title: {
      text: 'State Funnel',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}',
    },
    series: [
      {
        type: 'funnel',
        left: '10%',
        top: 40,
        width: '80%',
        min: 0,
        sort: 'descending',
        label: {
          show: true,
          position: 'inside',
        },
        itemStyle: {
          borderColor: '#fff',
          borderWidth: 1,
        },
        data: funnelData,
      },
    ],
  }
 
  return (
    <Paper sx={{ p: 3 }}>
      <ReactECharts option={option} style={{ height: 400 }} />
    </Paper>
  )
}
 
export default StateFunnelChart