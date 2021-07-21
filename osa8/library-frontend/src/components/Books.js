import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const GenreButton = ({ genre, setGenre }) => {

  return (
    <button onClick={() => setGenre(genre)}>{genre}</button>
  )
}

const GenresSubtitle = ({ genre }) => {

  if (genre === '') {
    return (
      <div>
        in <b>all genres</b>
      </div>
    )
  }
    return (
      <div>
        in genre <b>{genre}</b>
      </div>
    )
  }

const Books = (props) => {

  const [genre, setGenre] = useState('')

  const result = useQuery(ALL_BOOKS, {
    pollInterval: 2000
  })

  if (result.loading)  {
    return <div>loading...</div>
  }

  if (!props.show) {
    return null
  }

  //make list of genres w/o duplicates
  let genres = [] 
  genres = result.data.allBooks.map(b => genres.concat(b.genres))
  genres = genres.flat()
  const uniqueGenres = [...new Set(genres)]
  
  const books = (genre === '') 
  ? result.data.allBooks
  : result.data.allBooks.filter(b => (b.genres.includes(genre)))


  return (
    <div>
      <h2>books</h2>
      <br></br>
      <GenresSubtitle genre={genre} />
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      {uniqueGenres.map(ug => <GenreButton key={ug} genre={ug} setGenre={setGenre}/>)}<button onClick={() => setGenre('')}>all genres</button>
    </div>
  )
}

export default Books