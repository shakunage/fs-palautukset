import React from 'react'

const Confirmation = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="confirm">
      {message}
    </div>
  )
}

export default Confirmation