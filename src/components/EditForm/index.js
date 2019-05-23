import React, { useState } from 'react'
import { updatePlayer } from 'src/api'
import { tsPropertySignature } from '@babel/types'

const SaveButton = ({ onClick }) => <button onClick={onClick}>Save</button>

const EditForm = ({ player, onSave }) => {
  const [name, setName] = useState(player.name)
  const [college, setCollege] = useState(player.college)
  const [position, setPosition] = useState(player.position)

  return (
    <div>
      <div>
        <label for='name'>Name</label>
        <input
          id='name'
          type='text'
          name='name'
          value={name}
          onChange={event => setName(event.target.value)}
        />
      </div>
      <div>
        <label for='college'>College</label>
        <input
          id='college'
          type='text'
          name='college'
          value={college}
          onChange={event => setCollege(event.target.value)}
        />
      </div>
      <div>
        <label for='position'>Position</label>
        <input
          id='position'
          type='text'
          name='position'
          value={position}
          onChange={event => setPosition(event.target.value)}
        />
      </div>
      <SaveButton
        onClick={event => {
          updatePlayer({
            id: player.id,
            body: { college, name, position }
          }).then(result => {
            onSave()
          })
        }}
      />
    </div>
  )
}

export default EditForm
