import { useEffect, useState } from 'react'
import { Box, Skeleton } from '@mui/material'
 
import KpiCard from '../components/KpiCard'
import PriorityPieChart from '../charts/PriorityPieChart'
import CategoryBarChart from '../charts/CategoryBarChart'
import GroupWorkloadBarChart from '../charts/GroupWorkloadBarChart'
import SlaBreachDonutChart from '../charts/SlaBreachDonutChart'
import StateFunnelChart from '../charts/StateFunnelChart'
import TopCallersTable from '../components/TopCallersTable'
 

 
type Props = {
  refreshKey?: number
}
 
const Overview = ({ refreshKey }: Props) => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<any>({})
 
  const loadDashboard = async () => {
    setLoading(true)
 
    const fetchJson = async (id: string) => {
      const res = await fetch(`http://localhost:3000/api/metrics/${id}`)
      return res.json()
    }
 
    try {
      const [
        m1,
        m6,
        m10,
        m2,
        m4,
        m5,
        m7,
        m9,
        m8,
      ] = await Promise.all([
        fetchJson('M1'),
        fetchJson('M6'),
        fetchJson('M10'),
        fetchJson('M2'),
        fetchJson('M4'),
        fetchJson('M5'),
        fetchJson('M7'),
        fetchJson('M9'),
        fetchJson('M8'),
      ])
 
      setData({
        m1,
        m6,
        m10,
        m2,
        m4,
        m5,
        m7,
        m9,
        m8,
      })
    } catch (error) {
      console.error('Failed to load dashboard data', error)
    } finally {
      setLoading(false)
    }
  }
 
  // Load on first render + when refreshKey changes
  useEffect(() => {
    loadDashboard()
  }, [refreshKey])
 
  return (
    <Box display="flex" flexDirection="column" gap={4}>
      {/* KPI CARDS */}
      <Box display="flex" gap={2}>
        {loading ? (
          <>
            <Skeleton width={200} height={100} />
            <Skeleton width={200} height={100} />
            <Skeleton width={200} height={100} />
          </>
        ) : (
          <>
            <KpiCard title="Total Open Incidents" value={data.m1.count} />
            <KpiCard title="Unassigned Tickets" value={data.m6.count} />
            <KpiCard title="Stale Tickets (>30d)" value={data.m10.count} />
          </>
        )}
      </Box>
 
      {/* CHARTS + TABLE */}
      {loading ? (
        <>
          <Skeleton height={400} />
          <Skeleton height={400} />
          <Skeleton height={400} />
        </>
      ) : (
        <>
          <PriorityPieChart data={data.m2.data} />
          <CategoryBarChart data={data.m4.data} />
          <GroupWorkloadBarChart data={data.m5.data} />
          <SlaBreachDonutChart data={data.m7.data} />
          <StateFunnelChart data={data.m9.data} />
          <TopCallersTable data={data.m8.data} />
        </>
      )}
    </Box>
  )
}
 
export default Overview