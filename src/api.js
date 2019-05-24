import { curry } from 'ramda'

const baseUrl = 'http://localhost:3008'

const apiGet = curry((endpoint, { page, search }) => {
  console.log({ search })
  let queryString = `?_page=${page || ''}&q=${search || ''}`

  return fetch(baseUrl + endpoint + queryString).then(response =>
    response.json()
  )
})

const apiPatch = curry((endpoint, { id, body }) => {
  return fetch(`${baseUrl + endpoint}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(response => response.json())
})

const apiPost = curry((endpoint, body) => {
  return fetch(`${baseUrl + endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
})

const apiDelete = curry((endpoint, id) => {
  return fetch(`${baseUrl + endpoint}/${id}`, {
    method: 'DELETE'
  })
})

export const getPlayers = apiGet('/players')
export const getTeams = apiGet('/teams')
export const getFavorites = apiGet('/favorites')
export const updatePlayer = apiPatch('/players')
export const addFavorite = apiPost('/favorites')
export const deleteFavorite = apiDelete('/favorites')
