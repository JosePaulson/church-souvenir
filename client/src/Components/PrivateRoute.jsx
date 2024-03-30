import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

// Restrict routing to logged-in user
const PrivateRoute = () => {
    const { userInfo } = useSelector(state => state.auth)
  return (
    userInfo ? <Outlet /> : <Navigate to={'/login'} replace />
  )
}

export default PrivateRoute