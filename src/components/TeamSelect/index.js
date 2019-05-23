import React from 'react'
import { map } from 'ramda'

const TeamSelect = ({ teams, selected, onChange }) => (
  <select
    defaultValue={selected}
    onChange={event => onChange(event.target.value)}
  >
    {map(
      team => (
        <option key={team.id} value={team.id}>
          {team.name}
        </option>
      ),
      teams
    )}
  </select>
)

export default TeamSelect
