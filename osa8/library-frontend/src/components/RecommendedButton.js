import React from 'react'

const RecommendedButton = (props) => {

    if (!props.token) {
        return null
      }
  
    return (
        <button onClick={() => props.setPage('recommended')}>recommendations</button>
    )
}

export default RecommendedButton
