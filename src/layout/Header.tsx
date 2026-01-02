import { useAuth } from '../context/AuthContext'
 
type HeaderProps = {
  onRefresh?: () => void
}
 
const Header = ({ onRefresh }: HeaderProps) => {
  const { user, signOut } = useAuth()
 
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        height: 60,
        borderBottom: '1px solid #e0e0e0',
        backgroundColor: '#fff',
      }}
    >
      <strong>Dashboard</strong>
 
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        {user?.email && <span>{user.email}</span>}
 
        {onRefresh && (
          <button onClick={onRefresh}>
            Refresh
          </button>
        )}
 
        <button onClick={signOut}>
          Logout
        </button>
      </div>
    </div>
  )
}
 
export default Header