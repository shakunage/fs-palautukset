import React, { useState } from 'react'
import { useApolloClient, useSubscription} from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'
import AddButton from './components/AddButton'
import LoginButton from './components/LoginButton'
import LogoutButton from './components/LogoutButton'
import RecommendedButton from './components/RecommendedButton'
import { BOOK_ADDED } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      window.alert(`Book added! Title: ${subscriptionData.data.bookAdded.title}`)
    }
  })

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <AddButton token={token} setPage={setPage}/>
        <LoginButton token={token} setPage={setPage}/>
        <LogoutButton token={token} logout={logout}/>
        <RecommendedButton token={token} setPage={setPage}/>
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

      <LoginForm
        show={page === 'login'} page={page} setToken={setToken} setPage={setPage}
      />

      <Recommendations
        show={page === 'recommended'} token={token} page={page} setToken={setToken} setPage={setPage}
      />



    </div>
  )
}

export default App