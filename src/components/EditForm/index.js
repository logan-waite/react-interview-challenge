import React, { useState } from 'react'
import { updatePlayer } from 'src/api'
import { getByValue } from 'src/utils'
import TeamSelect from 'src/components/TeamSelect'
import TextInput from 'src/components/TextInput'

const SaveButton = ({ onClick }) => (
  <button
    style={{
      float: 'right',
      fontSize: '16px',
      backgroundColor: 'limegreen',
      borderRadius: '4px',
      padding: '.5rem .75rem',
      color: 'white',
      border: '1px solid green'
    }}
    onClick={onClick}
  >
    Save
  </button>
)

const EditForm = ({ player, onSave, teams }) => {
  const [name, setName] = useState(player.name)
  const [college, setCollege] = useState(player.college)
  const [position, setPosition] = useState(player.position)
  const [team, setTeam] = useState(getByValue(player.team, 'name', teams).id)

  return (
    <div>
      <h2>Edit Player</h2>
      <TextInput
        name='name'
        value={name}
        onChange={event => setName(event.target.value)}
      />
      <TextInput
        name='college'
        value={college}
        onChange={event => setCollege(event.target.value)}
      />
      <TextInput
        name='position'
        value={position}
        onChange={event => setPosition(event.target.value)}
      />
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
