import React, { useState } from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'
import Select from 'react-select'

const ALL_AUTHORS = gql`
  query {
    allAuthors  {
      name
      born
      bookCount
    }
  }
`

const EDIT_YEAR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo)  {
      name
      born
      bookCount
    }
  }
`

const Authors = (props) => {
  const [nameToChange, setNameToChange] = useState(null)
  const [yearToChange, setYearToChange] = useState('')

  const result = useQuery(ALL_AUTHORS, {
    pollInterval: 2000
  })
  const [ editYear ] = useMutation(EDIT_YEAR, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })

  if (result.loading)  {
    return <div>loading...</div>
  }

  if (!props.show) {
    return null
  }
  const authors = result.data.allAuthors

  const options = authors.map(a => ({value: a.name, label: a.name}))

  const submit = async (event) => {
    event.preventDefault()

    const name = nameToChange.value
    const setBornTo = yearToChange

    editYear({ variables: { name, setBornTo } })

    setNameToChange('')
    setYearToChange('')
  }

  
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h1>Set birthyear</h1>
      <form onSubmit={submit}>
        <Select defaultValue={nameToChange} onChange={setNameToChange} options={options} />
        <p></p>
        born <input type="born" value={yearToChange} onChange={({ target }) => setYearToChange(parseInt(target.value))}/>
        <p></p>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default Authors