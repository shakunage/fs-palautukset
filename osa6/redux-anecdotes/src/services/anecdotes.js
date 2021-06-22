import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return await response.data
}

const createNew = async (object) => {
  const pushedObject = {
    content: object.content,
    id: object.id, 
    votes: object.votes }
  const response = await axios.post(baseUrl, pushedObject)
  return await response.data
}

const update = async (newObject) => {
  const response = await axios.put(`${baseUrl}/${newObject.id}`, newObject)
  return await response.data
}

export default { getAll, createNew, update }