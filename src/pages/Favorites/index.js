import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import * as R from 'ramda'
import { getFavorites, deleteFavorite, addFavorite } from 'src/api'
import DraggableCard from 'src/components/DraggableCard'

const CardList = ({ players }) =>
  R.addIndex(R.map)(
    (player, index) => (
      <DraggableCard small key={player.id} index={index} player={player} />
    ),
    players
  )

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

class Favorites extends Component {
  constructor (props) {
    super(props)

    this.state = {
      favorites: []
    }
  }

  onDragEnd = result => {
    if (!result.destination) {
      return
    }

    if (result.destination.index === result.source.index) {
      return
    }

    const favorites = reorder(
      this.state.favorites,
      result.source.index,
      result.destination.index
    )

    R.pipe(
      R.map(favorite => {
        deleteFavorite(favorite.id)
        return favorite
      }),
      R.map(favorite => {
        addFavorite(favorite)
        return favorite
      }),
      favorites => this.setState({ favorites })
    )(favorites)
  }

  componentDidMount () {
    getFavorites({}).then(favorites => this.setState({ favorites }))
  }

  render () {
    return (
      <div>
        <Link to='/'>Back</Link>
        <h2>Favorites</h2>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId='favoritesDroppable'>
            {provided => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <CardList players={this.state.favorites} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    )
  }
}

export default Favorites
