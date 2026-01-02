import { createContext, useContext } from 'react'
 
type RefreshContextType = {
  refreshKey: number
}
 
const RefreshContext = createContext<RefreshContextType | null>(null)
 
export const useRefresh = () => {
  const ctx = useContext(RefreshContext)
  if (!ctx) {
    throw new Error('useRefresh must be used inside RefreshProvider')
  }
  return ctx
}
 
export default RefreshContext