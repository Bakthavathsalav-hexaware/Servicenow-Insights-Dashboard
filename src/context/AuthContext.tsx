import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
 
type AuthContextType = {
  user: any
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}
 
const AuthContext = createContext<AuthContextType | null>(null)
 
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
 
  useEffect(() => {
    // Initial session
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null)
      setLoading(false)
    })
 
    // Listen to auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
 
    return () => {
      subscription.unsubscribe()
    }
  }, [])
 
  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) throw error
  }
 
  const signup = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    })
    if (error) throw error
  }
 
  const signOut = async () => {
    await supabase.auth.signOut()
  }
 
  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signup,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
 
export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used inside AuthProvider')
  }
  return ctx
}