import { useState } from 'react'

export const useCountries = (country) => {
    const [value, setValue] = useState('')
  
    const onChange = (event) => {
      setValue(event.target.value)
    }
    
    return {
      value,
      onChange
    }
  }
