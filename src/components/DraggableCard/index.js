import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import Card from 'src/components/Card'

const DraggableCard = ({ player, index }) => {
  return (
    <Draggable draggableId={player.id} index={index}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Card small player={player} />
        </div>
      )}
    </Draggable>
  )
}

export default DraggableCard
