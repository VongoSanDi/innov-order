import { useAuth } from '@/context/AuthContext'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
  const { logout } = useAuth()
  const navigate = useNavigate()
  useEffect(() => {
    logout()
    navigate("/")
  }, [])
  return null
}

export default Logout
