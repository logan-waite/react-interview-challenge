import React from 'react'
import { map } from 'ramda'
import styles from './styles'
import inputStyles from 'src/components/TextInput/styles'

const TeamSelect = ({ teams, selected, onChange }) => (
  <>
    <label style={inputStyles.label} htmlFor='team'>
      Team
    </label>
    <select
      id='team'
      style={styles.select}
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
  </>
)

export default TeamSelect
