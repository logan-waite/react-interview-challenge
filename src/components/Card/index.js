import React from 'react'
import styles from './styles'
import { addFavorite, deleteFavorite } from 'src/api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as hollowHeart } from '@fortawesome/free-regular-svg-icons'

const EditButton = ({ onClick }) => <button onClick={onClick}>Edit</button>

const handleFavoriteClick = (isFavorite, player, onFavorited) => () => {
  const action = isFavorite
    ? () => deleteFavorite(player.id)
    : () => addFavorite(player)
  action().then(result => {
    onFavorited()
  })
}

const Card = props => {
  return (
    <div style={{ ...styles.container, ...props.style }}>
      <FontAwesomeIcon
        icon={props.isFavorite ? solidHeart : hollowHeart}
        onClick={handleFavoriteClick(
          props.isFavorite,
          props.player,
          props.onFavorited
        )}
      />
      <h3 style={styles.name}>{props.player.name}</h3>
      <span>{props.player.position}</span>
      <img
        src={`http://localhost:3008/${props.player.image}`}
        style={styles.playerImage}
        alt='player_image'
      />

      <div>{props.player.team}</div>
      <div className='buttons' style={styles.buttons}>
        <EditButton onClick={props.onEdit} />
      </div>
    </div>
  )
}

export default Card
