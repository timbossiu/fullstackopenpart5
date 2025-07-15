import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const modifyBlog = (updatedBlog) => {
  console.log('modifying blog', updatedBlog)
  const request = axios.put(`${baseUrl}/${updatedBlog.id}`, updatedBlog)
  return request.then(response => response.data)
}

export default { getAll, setToken, create, modifyBlog }