import React, { useState } from 'react'
import { updatePlayer } from 'src/api'
import { getByValue } from 'src/utils'
import TeamSelect from 'src/components/TeamSelect'

const SaveButton = ({ onClick }) => <button onClick={onClick}>Save</button>

const EditForm = ({ player, onSave, teams }) => {
  const [name, setName] = useState(player.name)
  const [college, setCollege] = useState(player.college)
  const [position, setPosition] = useState(player.position)
  const [team, setTeam] = useState(getByValue(player.team, 'name', teams).id)

  return (
    <div>
      <div>
        <label htmlFor='name'>Name</label>
        <input
          id='name'
          type='text'
          name='name'
          value={name}
          onChange={event => setName(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor='college'>College</label>
        <input
          id='college'
          type='text'
          name='college'
          value={college}
          onChange={event => setCollege(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor='position'>Position</label>
        <input
          id='position'
          type='text'
          name='position'
          value={position}
          onChange={event => setPosition(event.target.value)}
        />
      </div>
      <TeamSelect
        teams={teams}
        selected={team}
        onChange={team => {
          console.log(team)
          setTeam(team)
        }}
      />
      <SaveButton
        onClick={event => {
          updatePlayer({
            id: player.id,
            body: { college, name, position, team }
          }).then(result => {
            onSave()
          })
        }}
      />
    </div>
  )
}

export default EditForm
