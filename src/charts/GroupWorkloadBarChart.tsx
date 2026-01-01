import ReactECharts from 'echarts-for-react'
 
type BarData = {
  name: string
  value: number
}
 
type Props = {
  data: BarData[]
}
 
const GroupWorkloadBarChart = ({ data }: Props) => {
  const option = {
    title: {
      text: 'Group Workload',
      left: 'center',
    },
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      type: 'value',
    },
    yAxis: {
      type: 'category',
      data: data.map((d) => d.name),
    },
    series: [
      {
        type: 'bar',
        data: data.map((d) => d.value),
      },
    ],
  }
 
  return <ReactECharts option={option} style={{ height: 400 }} />
}
 
export default GroupWorkloadBarChart