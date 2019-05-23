import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

const IconButton = props => (
  <div onPress={onPress}>
    <FontAwesomeIcon icon={faHeart} />
  </div>
)
