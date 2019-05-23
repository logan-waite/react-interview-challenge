import { curry } from 'ramda'

const baseUrl = 'http://localhost:3008'

const apiGet = curry((endpoint, { page, search }) => {
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

export const getPlayers = apiGet('/players')
export const getTeams = apiGet('/teams')
export const updatePlayer = apiPatch('/players')
