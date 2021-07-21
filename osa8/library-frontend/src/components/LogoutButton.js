import React from 'react'

const LogoutButton = ({ token, logout}) => {

    if (!token) {
        return null
      }
  
    return (
        <button onClick={() => logout()}>logout</button>
    )
}

export default LogoutButton
