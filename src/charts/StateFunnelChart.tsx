import ReactECharts from 'echarts-for-react'
 
type Props = {
  data: { name: string; value: number }[]
}
 
const StateFunnelChart = ({ data }: Props) => {
  const option = {
    title: {
      text: 'Incident State Funnel',
      left: 'center',
    },
    tooltip: { trigger: 'item' },
    series: [
      {
        type: 'funnel',
        data,
      },
    ],
  }
 
  return <ReactECharts option={option} style={{ height: 400 }} />
}
 
export default StateFunnelChart