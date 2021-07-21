import React from 'react'

const AddButton = (props) => {

    if (!props.token) {
        return null
      }
  
    return (
        <button onClick={() => props.setPage('add')}>add book</button>
    )
}

export default AddButton
