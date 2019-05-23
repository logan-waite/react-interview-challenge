import { curry } from 'ramda'

const callApiGet = curry((endpoint, { page, search }) => {
  const baseUrl = 'http://localhost:3008'
  let queryString = `?_page=${page || ''}&q=${search || ''}`

  return fetch(`${baseUrl + endpoint + queryString}`).then(response =>
    response.json()
  )
})

export const getPlayers = callApiGet('/players')
export const getTeams = callApiGet('/teams')
