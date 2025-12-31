import ReactECharts from 'echarts-for-react'
 
type BarData = {
  name: string
  value: number
}
 
type Props = {
  data: BarData[]
}
 
const CategoryBarChart = ({ data }: Props) => {
  const option = {
    title: {
      text: 'Incidents by Category',
      left: 'center',
    },
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      type: 'category',
      data: data.map((d) => d.name),
    },
    yAxis: {
      type: 'value',
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
 
export default CategoryBarChart