import { curry } from 'ramda'

const callApi = curry((endpoint, { page, search }) => {
  const baseUrl = 'http://localhost:3008'
  let queryString = ''
  if (page !== undefined) {
    queryString = `?_page=${page}`
  }

  return fetch(`${baseUrl + endpoint + queryString}`).then(response =>
    response.json()
  )
})

export const getPlayers = callApi('/players')
export const getTeams = callApi('/teams')
