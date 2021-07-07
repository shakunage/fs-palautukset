import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, prettyDOM } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
    let component

    const blog = {
        "title":"Thoughts on Flash",
        "author":"Steve Jobs",
        "url":"apple.com",
        "user":   {
            "username":"hessu",
            "name":"Heikki Virtanen",
            "id":"60ba378efebe1503824003b3"
          },
        "likes":7,
        "id":"60ba3c17d734c803e919305a"
      }

    const clickLike = jest.fn()

    beforeEach(() => {
      component = render(
        <Blog buttonLabel="view" blog={blog} addLike={clickLike}>
          <div className="testDiv" />
        </Blog>
      )
    })
  
    test('renders author and title, but not url and likes before button is clicked', () => {
        const div = component.container.querySelector('.blog')

      expect(
        component.container.querySelector('.blog')
      ).toBeDefined()
      expect(div).toHaveTextContent('Thoughts on Flash')
      expect(div).toHaveTextContent('Steve Jobs')
      expect(div).not.toHaveTextContent('apple.com')
      expect(div).not.toHaveTextContent('7')
    })
    
      test('url and likes are rendered after button is clicked', () => {
        const button = component.getByText('view')
        fireEvent.click(button)
    
        const div = component.container.querySelector('.togglableContent')
        expect(div).not.toHaveStyle('display: none')
        expect(div).toHaveTextContent('Thoughts on Flash')
        expect(div).toHaveTextContent('Steve Jobs')
        expect(div).toHaveTextContent('apple.com')
        expect(div).toHaveTextContent('7')
      })

      test('two like button clicks calls props function twice', () => {
        const button1 = component.getByText('view')
        fireEvent.click(button1)

        const button2 = component.getByText('like')
        fireEvent.click(button2)
        fireEvent.click(button2)
    
        expect(clickLike.mock.calls).toHaveLength(2)
      })
  })