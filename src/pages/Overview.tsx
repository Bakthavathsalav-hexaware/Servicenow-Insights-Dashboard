import { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import KpiCard from '../components/KpiCard'
import PriorityPieChart from '../charts/PriorityPieChart'
import CategoryBarChart from '../charts/CategoryBarChart'
 
type MetricResponse = {
  metric: string
  label: string
  count: number
}
 
type ChartData = {
  name: string
  value: number
}
 
const Overview = () => {
  // =====================
  // KPI STATES (Story 4)
  // =====================
  const [m1, setM1] = useState(0)
  const [m6, setM6] = useState(0)
  const [m10, setM10] = useState(0)
 
  // =====================
  // CHART STATES (Story 5)
  // =====================
  const [priorityData, setPriorityData] = useState<ChartData[]>([])
  const [categoryData, setCategoryData] = useState<ChartData[]>([])
 
  const [loading, setLoading] = useState(true)
 
  useEffect(() => {
    const fetchMetricCount = async (id: string): Promise<number> => {
      const res = await fetch(`http://localhost:3000/api/metrics/${id}`)
      const data: MetricResponse = await res.json()
      return data.count
    }
 
    const fetchChartData = async (id: string): Promise<ChartData[]> => {
      const res = await fetch(`http://localhost:3000/api/metrics/${id}`)
      const data = await res.json()
      return data.data
    }
 
    const loadDashboardData = async () => {
      try {
        // KPIs
        const [m1Count, m6Count, m10Count] = await Promise.all([
          fetchMetricCount('M1'),
          fetchMetricCount('M6'),
          fetchMetricCount('M10'),
        ])
 
        setM1(m1Count)
        setM6(m6Count)
        setM10(m10Count)
 
        // Charts
        const [priorityChart, categoryChart] = await Promise.all([
          fetchChartData('M2'),
          fetchChartData('M4'),
        ])
 
        setPriorityData(priorityChart)
        setCategoryData(categoryChart)
      } catch (error) {
        console.error('Failed to load dashboard data', error)
      } finally {
        setLoading(false)
      }
    }
 
    loadDashboardData()
  }, [])
 
  if (loading) {
    return <p>Loading dashboard...</p>
  }
 
  return (
    <Box display="flex" flexDirection="column" gap={4}>
      {/* =====================
          KPI CARDS (Story 4)
         ===================== */}
      <Box display="flex" gap={2}>
        <KpiCard title="Total Open Incidents" value={m1} />
        <KpiCard title="Unassigned Tickets" value={m6} />
        <KpiCard title="Stale Tickets (>30d)" value={m10} />
      </Box>
 
      {/* =====================
          CHARTS (Story 5)
         ===================== */}
      {priorityData.length > 0 && (
        <PriorityPieChart data={priorityData} />
      )}
 
      {categoryData.length > 0 && (
        <CategoryBarChart data={categoryData} />
      )}
    </Box>
  )
}
 
export default Overview