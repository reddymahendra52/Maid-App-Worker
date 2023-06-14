import React, { useEffect } from 'react'

const Logout = () => {
  useEffect(() => {
    // Clear local storage cache
    localStorage.clear()

    // Redirect to login page
    window.location.href = '/pages/login'
  }, [])

  return null
}

export default Logout
