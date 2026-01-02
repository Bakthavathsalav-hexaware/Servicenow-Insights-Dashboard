import { useState } from 'react'
import { TextField, Button, Paper } from '@mui/material'
import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
 
const Login = () => {
  const { signIn } = useAuth()
  const navigate = useNavigate()
 
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
 
  const handleLogin = async () => {
    try {
      await signIn(email, password)
      navigate('/dashboard')
    } catch (err: any) {
      setError(err.message)
    }
  }
 
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Paper
        elevation={0}
        style={{
          width: 360,
          padding: 32,
          borderRadius: 12,
          border: '1px solid var(--aurora-border)',
          backgroundColor: 'var(--aurora-card)',
        }}
      >
        <h2 style={{ marginBottom: 24 }}>Sign in</h2>
 
        <TextField
          fullWidth
          label="Email"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
 
        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
 
        {error && (
          <p style={{ color: 'red', marginTop: 8 }}>{error}</p>
        )}
 
        <Button
          fullWidth
          variant="contained"
          onClick={handleLogin}
          style={{
            marginTop: 24,
            backgroundColor: 'var(--aurora-primary)',
          }}
        >
          Login
        </Button>
 
        <p style={{ marginTop: 16, textAlign: 'center' }}>
          Don’t have an account?{' '}
          <Link to="/signup">Sign up</Link>
        </p>
      </Paper>
    </div>
  )
}
 
export default Login