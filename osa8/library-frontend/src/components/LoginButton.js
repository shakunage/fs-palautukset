import React from 'react'

const LoginButton = (props) => {

    if (props.token) {
        return null
      }
  
    return (
        <button onClick={() => props.setPage('login')}>login</button>
    )
}

export default LoginButton
