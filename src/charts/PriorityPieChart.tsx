import ReactECharts from 'echarts-for-react'
 
type PieData = {
  name: string
  value: number
}
 
type Props = {
  data: PieData[]
}
 
const PriorityPieChart = ({ data }: Props) => {
  const option = {
    title: {
      text: 'Incidents by Priority',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
    },
    series: [
      {
        name: 'Priority',
        type: 'pie',
        radius: '60%',
        data,
      },
    ],
  }
 
  return <ReactECharts option={option} style={{ height: 400 }} />
}
 
export default PriorityPieChart