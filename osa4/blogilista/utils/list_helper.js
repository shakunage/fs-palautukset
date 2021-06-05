const _ = require('lodash')
const dummy = (blogs) => {
    return 1 
  }

const totalLikes = (blogs) => {
    var likes = blogs.map((blog) => blog.likes)

    const reducer = (sum, item) => {
        return sum + item
      }

    return likes.reduce(reducer, 0) 
}

const favoriteBlog = (blogs) => {
  var likes = blogs.map((blog) => blog.likes)

  let max_likes = Math.max(...likes)

  const favoriteFilter = (blogs) => {
    return blogs.likes === max_likes
  }
  
  return blogs.filter(favoriteFilter)
}

const mostBlogs = (blogs) => {
  var authors = blogs.map((blog) => blog.author)
  
  if (blogs.length > 0) {
    const topAuthor = _.maxBy(Object.values(_.groupBy(authors, el => el)), authors => authors.length)[0]

    const topAuthorFilter = (blogs) => {
      return blogs.author === topAuthor
    }
    
    return [{
      "author": topAuthor, 
      "blogs": blogs.filter(topAuthorFilter).length
      }]
    
  } 
  return 0 
}

const mostLikes = (blogs) => {
  const authorsAndLikes = blogs.map(({_id, title, url, __v, ...item }) => item)
  var authors = blogs.map((blog) => blog.author)
  authors = [...new Set(authors)]
  let likes = []

  for (let i = 0; i < authors.length; i++) {
    var l = 0
    for (let n = 0; n < authorsAndLikes.length; n++) {
        if (authors[i] === authorsAndLikes[n].author) {
          l += authorsAndLikes[n].likes
        }
    }
    likes.push(l)
  }

  const maxLikes = Math.max(...likes)
  const key = Object.keys(likes).find(key => likes[key] === maxLikes)

  if (blogs.length !== 0) {
    return [{author: authors[key], likes: likes[key]}]
  }

  return 0
}



  
  module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
  }