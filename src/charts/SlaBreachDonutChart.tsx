import ReactECharts from 'echarts-for-react'
 
type Props = {
  data: { name: string; value: number }[]
}
 
const SlaBreachDonutChart = ({ data }: Props) => {
  const option = {
    title: {
      text: 'SLA Breach Status',
      left: 'center',
    },
    tooltip: { trigger: 'item' },
    series: [
      {
        type: 'pie',
        radius: ['40%', '70%'],
        data,
      },
    ],
  }
 
  return <ReactECharts option={option} style={{ height: 400 }} />
}
 
export default SlaBreachDonutChart