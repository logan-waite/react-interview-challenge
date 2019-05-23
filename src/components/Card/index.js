import React from 'react'
import styles from './styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as hollowHeart } from '@fortawesome/free-regular-svg-icons'

const EditButton = ({ onClick }) => <button onClick={onClick}>Edit</button>

const Card = props => {
  return (
    <div style={{ ...styles.container, ...props.style }}>
      <FontAwesomeIcon icon={props.isFavorite ? solidHeart : hollowHeart} />
      <div style={styles.name}>{props.name}</div>
      <img
        src={`http://localhost:3008/${props.image}`}
        style={styles.playerImage}
        alt='player_image'
      />

      <div>{props.team}</div>
      <div className='buttons' style={styles.buttons}>
        <EditButton onClick={props.onEdit} />
      </div>
    </div>
  )
}

export default Card
