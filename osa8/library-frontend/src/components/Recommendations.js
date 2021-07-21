import React from 'react'
import { useQuery } from '@apollo/client'
import { FAVGENRE, ALL_BOOKS } from '../queries'


const Recommendations = (props) =>  {

  const resultGenre = useQuery(FAVGENRE, {
    pollInterval: 2000
  })

  const resultBooks = useQuery(ALL_BOOKS, {
    pollInterval: 2000
  })

  if (!props.show) {
    return (
        null
    )
  }

  if (resultGenre.loading || resultBooks.loading || !props.token)  {
    return <div>loading...</div>
  }
  console.log(resultGenre)
  const favGenre = resultGenre.data.me.favoriteGenre
  const books = resultBooks.data.allBooks.filter(b => (b.genres.includes(favGenre)))

    return (
        <div>
            <h1>recommendations</h1>
            <br></br>
            books in your favorite genre <b>{favGenre}</b>
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
        </div>
    )
}

export default Recommendations
