import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

// Restrict routing to admin user
const AdminRoute = () => {
  const { userInfo } = useSelector(state => state.auth)
  return (
    userInfo?.isAdmin ? <Outlet /> : <Navigate to={'/login'} replace />
  )
}

export default AdminRoute