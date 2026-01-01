import { useState } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import RefreshContext from '../context/RefreshContest'
 
type Props = {
  children: React.ReactNode
}
 
const DashboardLayout = ({ children }: Props) => {
  const [refreshKey, setRefreshKey] = useState(0)
 
  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1)
  }
 
  return (
    <RefreshContext.Provider value={{ refreshKey }}>
      <div style={{ display: 'flex' }}>
        <Sidebar />
 
        <div style={{ flex: 1 }}>
          <Header onRefresh={handleRefresh} />
 
          <div style={{ padding: 16 }}>
            {children}
          </div>
        </div>
      </div>
    </RefreshContext.Provider>
  )
}
 
export default DashboardLayout